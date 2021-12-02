import { useRouter } from 'next/router';
import {Fragment} from 'react'
import Head from 'next/head'
import NewMeetupForm from '../../components/meetups/NewMeetupForm'


function NewMeetupPage(){

    const router = useRouter();

    async function onAddMeetupHandler(eneteredMeetupData){
        const response = await fetch('/api/new-meetup',{
            method:"POST",
            body: JSON.stringify(eneteredMeetupData),
            headers:{
                'Content-Type':'application/json'
            }
        })
        const data = await response.json();
        console.log(data);

        router.push('/')
    }
    return (
        <Fragment>
            <Head>
                <title>Add a new meetup</title>
                <meta 
                    name="description" 
                    content = "Browse bycicles meeting that you add from mongo db  "
                />
            </Head>
            <NewMeetupForm onAddMeetup={onAddMeetupHandler}></NewMeetupForm>
        </Fragment>
      
    )
}

export default NewMeetupPage;