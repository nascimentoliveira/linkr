import Navbar from "../components/Navbar.js";
import View from "../components/View.js";
import NewPublish from "../components/NewPublish.js";
import PostCard from "../components/PostCard.js";

export default function Timeline() {
  return (
    <>
      <Navbar />
      <View>
        <span>timeline</span>
        <NewPublish />
        <PostCard />
        <PostCard /* dupliquei um postcard só para testar o scroll 
                  da timeline enquanto o post ainda está estático */
        />
      </View>
    </>
  );
}
