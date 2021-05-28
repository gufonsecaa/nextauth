import { useContext } from "react"

import { AuthContext } from "../contexts/AuthContext"
import { withSSRAuthenticated } from "../utils/withSSRAuthenticated"
import { setupAPIClient } from "../services/api"
import { Can } from "../components/Can"

export default function Dashboard() {
  const { user, signOut } = useContext(AuthContext)

  return (
    <>
      <h1>Dashboard: {user?.email}</h1>

      <button onClick={signOut}>SignOut</button>

      <Can permissions={['metrics.list']}>
        <h1>Métricas</h1>
      </Can>
    </>
  )
}

export const getServerSideProps = withSSRAuthenticated(async (ctx) => {
  const apiClient = setupAPIClient(ctx)

  const response = await apiClient.get('/me')

  return {
    props: {}
  }
})
