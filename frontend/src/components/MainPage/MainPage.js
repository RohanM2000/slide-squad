import './MainPage.css'
import MainCarousel from './Carousel';


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
        <MainCarousel />
        {/* <footer>
          Copyright &copy; 2023 SlideSquad
        </footer> */}
      </div>
      </>
    );
  }
  
  export default MainPage;