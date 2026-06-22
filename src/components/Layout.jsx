import Header from "./Header";
import Footer from "./Footer";

function Layout(props) {
  return (
    <>
      <Header toggle={props.toggle} />
      {props.body}
      <Footer />
    </>
  );
}

export default Layout;