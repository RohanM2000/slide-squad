import './MainPage.css'
import MainCarousel from './Carousel.js';
import HomeCarousel from './HomeCarousel';


function MainPage() {
    return (
      <>
      <div className='mainpage-wrapper'>
        <div className='mainpage-header'>
          <div className='mainpage-heading'>
          
            <h1><i class="fa-solid fa-person-chalkboard"></i>  Create. Share. Discover.</h1>
            <p>Present with Impact: Unleash Your Storytelling Power with Our Presentation Platform</p>
          </div>
          <div className='featured-container'>

            <h3>Featured Presentations</h3>
       
          </div>
        </div>
        <HomeCarousel />
        {/* <MainCarousel /> */}
        {/* <div className='caro-icon-container'>
          <img src='../icons/presentation.gif'/>
          <img src='../icons/diagram.gif'/>
          <img src='../icons/presentation2.gif'/>

        </div> */}
        {/* <footer>
          Copyright &copy; 2023 SlideSquad
        </footer> */}
      </div>
      </>
    );
  }
  
  export default MainPage;