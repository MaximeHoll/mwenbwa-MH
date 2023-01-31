const mongoose = require('mongoose');


const treeSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    y_lambert72: {
        type: Number,
        
    },
    arbotag: {
        type: Number,
        
    },
    date_donnees: {
        type: Date,
        
    },   
    x_lambda: {
        type: Number,
        
    },
    geoloc: {
        lat: {
            type: Number,
            
        },
        lon: {
            type: Number,
            
        }
    },
    hauteur_totale: {
        type: Number,
        
    },
    x_lambert72: {
        type: Number,
        
    },
    y_phi: {
        type: Number,
        
    },
    nom_complet: {
        type: String,
        
    },
    diametre_cime: {
        type: Number,
        
    },
    circonf: {
        type: Number,
        
    },
    leaves: {
        type: Number,
        
    },
    free: {
        type: Boolean,
        default:true
    },
    available: {
        type:Boolean,
        default:true
    },
    random_name: {
        type: String,
        default: ""
    }

})





module.exports = mongoose.model('Tree', treeSchema)