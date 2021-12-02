import {Fragment} from 'react'
import { MongoClient, ObjectId} from 'mongodb'
import MeetupDetail from '../../components/meetups/MeetupDetail'
import Head from 'next/head'

function MeetupDetails (props) {
    console.log('props----',props)
    if(typeof (props.meetupData) !== 'undefined' ) {
        return <Fragment>
            <Head>
                <title>{props.meetupData.title}</title>
                <meta 
                    name="description" 
                    content = {`Browse bycicles meet - ${props.meetupData.description}`}
                />
            </Head>
            <MeetupDetail
            image={props.meetupData.image}
            title={props.meetupData.title}
            address={props.meetupData.address}
            description={props.meetupData.description}
        />
        </Fragment>
    }
    else { 
        return <Fragment>No data</Fragment>
    }
  
}
export async function getStaticPaths(){
    
    const client = await MongoClient.connect('mongodb://syler:159753258@cluster0-shard-00-00.okpks.mongodb.net:27017,cluster0-shard-00-01.okpks.mongodb.net:27017,cluster0-shard-00-02.okpks.mongodb.net:27017/meetups?ssl=true&replicaSet=atlas-ydi09o-shard-0&authSource=admin&retryWrites=true&w=majority',{
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
        
    const db = client.db();

    const meetupsCollection = db.collection('meetups');
   
    const meetups = await meetupsCollection.find({},{_id:1}).toArray();

    return {
        // set to true to create new build for this static path every time when it is accessed 
        fallback:true,
        paths:meetups.map(meetup => ({params:{meetupId:meetup._id.toString()}}))
        /*paths:[
            {
                params:{
                    meetupId: 'm1'
                }
            },
            {
                params:{
                    meetupId: 'm2'
                }
            }
        ]*/
    }
}


export async function getStaticProps(context){
    //fetch data to render it 
    const meetupId = context.params.meetupId;
    console.warn(context.params.meetupId)


    const client = await MongoClient.connect('mongodb://syler:159753258@cluster0-shard-00-00.okpks.mongodb.net:27017,cluster0-shard-00-01.okpks.mongodb.net:27017,cluster0-shard-00-02.okpks.mongodb.net:27017/meetups?ssl=true&replicaSet=atlas-ydi09o-shard-0&authSource=admin&retryWrites=true&w=majority',{
        useNewUrlParser: true,
        useUnifiedTopology: true
    })


    const db = client.db();

    const meetupsCollection = db.collection('meetups');
    
    const selectedMeetup = await meetupsCollection.findOne({_id:ObjectId(meetupId)});


    client.close();

    return {
        props:{
            meetupData:{
                id: selectedMeetup._id.toString(),
                title: selectedMeetup.title,
                address: selectedMeetup.address,
                image: selectedMeetup.image,
                description: selectedMeetup.description,
            }
        }
    }
   

}

export default MeetupDetails;