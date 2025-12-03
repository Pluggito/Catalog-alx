import Hero from "../components/Hero"
import NewCollections from "./NewCollections"
import NewsLetter from "./Newsletter"
import Policy from "./Policy"


const Home = () => {
  return (
    <div>
        <Hero />
        <NewCollections />
        <Policy />
        <NewsLetter />
    </div>
  )
}

export default Home