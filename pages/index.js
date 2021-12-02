//import { useEffect,useState } from 'react'

import Head from 'next/head'
import MeetUpList from '../components/meetups/MeetupList'
import {MongoClient} from 'mongodb'
import {Fragment} from 'react'

/*

const DUMMY_MEETUPS = [
    {
        id:'1',
        title:'Meetup first',
        image:'https://www.sefiles.net/merchant/1074/images/site/1074_LP_Trek-Bikes-img-2-slimC.jpg?t=1534950037691',
        address:'test address Varna',
        description:"first meetup descri"
    },
    {
        id:'2',
        title:'Meetup first 2' ,
        image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqcjrc1Kvw_lNLfoeQrWvmACr0X9_Po9hrIw&usqp=CAU',
        address:'test address Varna',
        description:"first meetup descri"
    }
]
*/
function HomePage(props){
    /*const [loadedMeetups,setLoadedMeetups] = useState([])

    useEffect(()=>{
        setLoadedMeetups(DUMMY_MEETUPS);
    })*/

    return (
        <Fragment>
            <Head>
                <title>React meetups</title>
                <meta 
                    name="description" 
                    content = "Browse bycicles "
                />
            </Head>
            <MeetUpList meetups={props.meetups}></MeetUpList>
        </Fragment>
    )
}

export async function getStaticProps(){
    const client = await MongoClient.connect('mongodb://syler:159753258@cluster0-shard-00-00.okpks.mongodb.net:27017,cluster0-shard-00-01.okpks.mongodb.net:27017,cluster0-shard-00-02.okpks.mongodb.net:27017/meetups?ssl=true&replicaSet=atlas-ydi09o-shard-0&authSource=admin&retryWrites=true&w=majority',{
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
        
    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const meetups =  await meetupsCollection.find().toArray();
    
    client.close();

    return { 
        props:{
            meetups:meetups.map(meetup=>({
                title:meetup.title,
                address:meetup.address,
                image:meetup.image,
                description:meetup.description,
                id:meetup._id.toString()
            }))
        },
        revalidate:120
    }
}

/*
export async function getServerSideProps(context){
    const req = context.req;
    const res = context.res;
    // fetch data from API

    return { 
        props:{
            meetups:DUMMY_MEETUPS
        }
    }
}
*/



export default HomePage;