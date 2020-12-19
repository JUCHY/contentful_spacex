import { useRouter } from 'next/router'
import { fetchEntries } from '@utils/getLaunchdata'



export default function Launch({launches}) {
    console.log(launches)
    const router = useRouter()
    const { id } = router.query
    const { launchDate, name, launchDetails, missionPatchUrl} = launches[0].fields;

    return <div>
        <p>Post : {id}</p>
        <div>{launchDate}</div>
        <div>{name}</div>
        <div>{launchDetails}</div>
        <div>{missionPatchUrl}</div>
        </div>
}

export async function getServerSideProps(context) {
    console.log(context)

    const {id} = context.query
    const res = await fetchEntries(id)

    return {
      props: {
        launches : res
      },
    }
  }