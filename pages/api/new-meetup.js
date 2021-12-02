import { MongoClient } from 'mongodb'
// /api/new-meetup 

async function handler(req,res){

    if ( req.method === "POST"){
        const data = req.body;

        //const { title, image, address, description } = data;

        const client = await MongoClient.connect('mongodb://syler:159753258@cluster0-shard-00-00.okpks.mongodb.net:27017,cluster0-shard-00-01.okpks.mongodb.net:27017,cluster0-shard-00-02.okpks.mongodb.net:27017/meetups?ssl=true&replicaSet=atlas-ydi09o-shard-0&authSource=admin&retryWrites=true&w=majority')
        
        const db = client.db();

        const meetupsCollection = db.collection('meetups');

        const result = await meetupsCollection.insertOne(data);

        console.log(result);

        client.close();

        res.status(201).json({message:"Meetup inserted !"})
    }

}

export default handler;