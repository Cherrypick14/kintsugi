import React from 'react';
import Slider from 'react-slick';
import '../styles/styles.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const StoriesSection = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      },
    ]
  };

  return (
    <section className="section stories-section" id="stories">
      <div className="container">
        <h2 className="section-title">Stories of Hope</h2>
        <Slider {...settings} className="testimonial-slider">
          <div className="testimonial-card">
            <div className="testimonial-content">
              <p>"I never thought I'd find the courage to speak up. Thanks to Kintsugi's anonymous reporting, I took the first step towards freedom. The support I received was life-changing. Now, I'm rebuilding my life with confidence and hope."</p>
            </div>
            <div className="testimonial-author">
              <img 
                src="/andrea.jpg"
                alt="Andrea's avatar" 
                className="testimonial-avatar" 
                width="50" 
                height="50"
              />
              <div className="testimonial-info">
                <h4>Andrea M.</h4>
                <p>Survivor &amp; Advocate</p>
              </div>
            </div>
          </div>

          <div className="testimonial-card">
            <div className="testimonial-content">
              <p>"As a male survivor, I felt alone and misunderstood. Kintsugi provided me with resources and a community that helped me reclaim my life. I'm now an advocate for other survivors, breaking the stigma surrounding male victims of abuse."</p>
            </div>
            <div className="testimonial-author">
              <img 
                src="/brooke-cagle.jpg"
                alt="Brooke avatar" 
                className="testimonial-avatar" 
                width="50" 
                height="50"
              />
              <div className="testimonial-info">
                <h4>Brooke K.</h4>
                <p>Survivor &amp; Mentor</p>
              </div>
            </div>
          </div>

          <div className="testimonial-card">
            <div className="testimonial-content">
              <p>"The legal support I received through Kintsugi was instrumental in my case. Today, I stand strong, knowing justice has been served. This platform truly saves lives. I'm grateful for the chance to start anew and help others do the same."</p>
            </div>
            <div className="testimonial-author">
              <img 
                src="/alexandru.jpg"
                alt="Alexandria avatar" 
                className="testimonial-avatar" 
                width="50" 
                height="50"
              />
              <div className="testimonial-info">
                <h4>Alexandria L.</h4>
                <p>Survivor &amp; Legal Advocate</p>
              </div>
            </div>
          </div>
        </Slider>
      </div>
    </section>
  );
};

export default StoriesSection;