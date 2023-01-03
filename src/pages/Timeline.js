

import Navbar from '../components/Navbar.js';
import View from '../components/View.js';
import NewPublish from '../components/NewPublish.js';

export default function Timeline() {
  return (
    <>
      <Navbar />
      <View>
        <span>timeline</span>
        <NewPublish />
      </View>
    </>
  );
}