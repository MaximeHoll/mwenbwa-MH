const asyncHandler = require('express-async-handler')
const Tree = require('../models/Tree')
const User = require('../models/User')
const { nameByRace } = require("fantasy-name-generator")


//@desc Assign 3 trees to newly registered user
//@route PATCH /trees/register
//@access Private

const assignTrees = asyncHandler(async (req,res) => {
    const { user_id } = req.body

    
    if(!user_id){
        return res.status(400).json({message: 'No user found'})
    }

    const userTrees = await Tree.find({"user_id": null}).limit(3).exec()
    let assignedTrees = []

    for(let i = 0; i < userTrees.length; i++) {
        userTrees[i].user_id = user_id
        const assignedTree = await userTrees[i].save()
        assignedTrees.push(assignedTree)
    }

    res.json(assignedTrees)
})

//@desc Buy an available tree (no user_id)
//@route POST /trees/buy/:id
//@access Private

const buyTree = asyncHandler(async (req,res) => {
    const { user_id } = req.body
    const { tree_id } = req.body

    const user = await User.findById(user_id).select("-password").exec()

    if(!user) return res.json({"Message": "User not found"})

    const foundTree = await Tree.findById(tree_id).exec()

    if(foundTree.locked) return res.json({"Message": "Tree is locked and can't be bought"})

    if(!foundTree) return res.json({"Message": "Tree does not exist"})

    if(foundTree.user_id == user._id) return res.json({"Message": "Tree was already bought"})


    if(foundTree.user_id === null) {

    console.log(foundTree.user_id)

    if(foundTree.leaves > user.leaves) return res.json({"Message": "Not enough leaves to buy this tree"})

    foundTree.random_name = nameByRace("human")
    foundTree.user_id = user._id
    user.leaves = user.leaves - foundTree.leaves

    await foundTree.save()
    await user.save()

    res.json({"Message": `${user.username} bought ${foundTree.random_name} for ${foundTree.leaves} leaves. Balance is now ${user.leaves} leaves.`})


    }

    

    if(foundTree.user_id) {

        let r = 0.1/6371

        let latT = Math.asin(Math.sin(foundTree.geoloc.lat)/Math.cos(r))

        let deltaLon = Math.acos((Math.cos(r) - Math.sin(latT) * Math.sin(foundTree.geoloc.lat)) / (Math.cos(latT)*Math.cos(foundTree.geoloc.lat)))

        let maxLat = foundTree.geoloc.lat + r
        let minLat = foundTree.geoloc.lat - r

        let maxLon = foundTree.geoloc.lon + deltaLon
        let minLon = foundTree.geoloc.lon - deltaLon

        const treesInRadius = await Tree.find({"geoloc.lat":{$gte: minLat, $lte: maxLat }, "geoloc.lon": {$gte: minLon, $lte: maxLon } }).exec()

        const playerTreesinRadius = await Tree.find({"geoloc.lat":{$gte: minLat, $lte: maxLat }, "geoloc.lon": {$gte: minLon, $lte: maxLon }, "user_id": foundTree.user_id}).exec()

        console.log(treesInRadius.length, playerTreesinRadius.length, maxLon, maxLat, deltaLon,foundTree.geoloc.lat, foundTree.geoloc.lon)

        const arrayPlayerTreesinRadius = []

        for(let i=0; i< playerTreesinRadius.length; i++) {
            arrayPlayerTreesinRadius.push(playerTreesinRadius[i].leaves)
        }

        const valuePlayerTreesinRadius = arrayPlayerTreesinRadius.reduce(function(a, b){
            return a + b;
        })

        const myTreesinRadius = await Tree.find({"geoloc.lat":{$gte: minLat, $lte: maxLat }, "geoloc.lon": {$gte: minLon, $lte: maxLon }, "user_id": user._id}).exec()

        const arrayMyTreesinRadius = []

        for(let i=0; i< myTreesinRadius.length; i++) {
            arrayMyTreesinRadius.push(myTreesinRadius[i].leaves)
        }

        const valueMyTreesinRadius = arrayPlayerTreesinRadius.reduce(function(a, b){
            return a + b;
        })

        const otherPlayersTreesinRadius = await Tree.find({"geoloc.lat":{$gte: minLat, $lte: maxLat }, "geoloc.lon": {$gte: minLon, $lte: maxLon }, "user_id": {$ne:null}}).exec()

        const arrayOtherPlayersTreesinRadius = []

        for(let i=0; i< otherPlayersTreesinRadius.length; i++) {
            arrayOtherPlayersTreesinRadius.push(otherPlayersTreesinRadius[i].leaves)
        }

        const valueOtherPlayersTreesinRadius = arrayOtherPlayersTreesinRadius.reduce(function(a, b){
            return a + b;
        })


        let price = foundTree.leaves + (valuePlayerTreesinRadius * (treesInRadius.length / playerTreesinRadius.length)) + valueOtherPlayersTreesinRadius - valueMyTreesinRadius

        if(price > user.leaves) return res.json({"Message": "Not enough leaves to buy this tree"})

        foundTree.user_id = user._id
        user.leaves = user.leaves - price

        await foundTree.save()
        await user.save()

        res.json({"Message": `${user.username} bought ${foundTree.random_name} for ${foundTree.leaves} leaves. Balance is now ${user.leaves} leaves.`})
    }


})


module.exports = {
    assignTrees,
    buyTree
}
