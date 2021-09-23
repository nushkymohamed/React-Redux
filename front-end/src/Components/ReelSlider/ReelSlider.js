import React, { Component } from "react";
import Slider from "react-slick";

export default class ReelSlider extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 6,
      slidesToScroll: 2,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1
          }
        }
      ]
    };
    return (
	<>
      <div className="tutorReel">
		<div className="container">
	        <Slider {...settings}>
	            <div className="tutorReel__video">
		            <div className="tutorReel__video--wrapper">
		            <div className="tutorReel__tutor">
						<div className="tutorReel__leftcontent">
							<img src="https://picsum.photos/id/237/200/300" alt="avatar-icon" className="dark-icon icon--avatar" />
						</div>
						<div class="tutorReel__rightcontent">
							<p>John 1</p>
							<span>Smith</span>
						</div>
					</div>
		            </div>
	            </div>
	            <div className="tutorReel__video">
		            <div className="tutorReel__video--wrapper">
		            <div className="tutorReel__tutor">
						<div className="tutorReel__leftcontent">
							<img src="https://picsum.photos/id/237/200/300" alt="avatar-icon" className="dark-icon icon--avatar" />
						</div>
						<div class="tutorReel__rightcontent">
							<p>John 2</p>
							<span>Smith</span>
						</div>
					</div>
		            </div>
	            </div>
	        </Slider>
        </div>
      </div>

      <div className="tutorReel">
		<div className="container">
	        <Slider {...settings}>
	            <div className="tutorReel__video">
		            <div className="tutorReel__video--wrapper">
		            <div className="tutorReel__tutor">
						<div className="tutorReel__leftcontent">
							<img src="https://picsum.photos/id/237/200/300" alt="avatar-icon" className="dark-icon icon--avatar" />
						</div>
						<div class="tutorReel__rightcontent">
							<p>John 1</p>
							<span>Smith</span>
						</div>
					</div>
		            </div>
	            </div>
	            <div className="tutorReel__video">
		            <div className="tutorReel__video--wrapper">
		            <div className="tutorReel__tutor">
						<div className="tutorReel__leftcontent">
							<img src="https://picsum.photos/id/237/200/300" alt="avatar-icon" className="dark-icon icon--avatar" />
						</div>
						<div class="tutorReel__rightcontent">
							<p>John 2</p>
							<span>Smith</span>
						</div>
					</div>
		            </div>
	            </div>
	            <div className="tutorReel__video">
		            <div className="tutorReel__video--wrapper">
		            <div className="tutorReel__tutor">
						<div className="tutorReel__leftcontent">
							<img src="https://picsum.photos/id/237/200/300" alt="avatar-icon" className="dark-icon icon--avatar" />
						</div>
						<div class="tutorReel__rightcontent">
							<p>John 3</p>
							<span>Smith</span>
						</div>
					</div>
		            </div>
	            </div>
	            <div className="tutorReel__video">
		            <div className="tutorReel__video--wrapper">
		            <div className="tutorReel__tutor">
						<div className="tutorReel__leftcontent">
							<img src="https://picsum.photos/id/237/200/300" alt="avatar-icon" className="dark-icon icon--avatar" />
						</div>
						<div class="tutorReel__rightcontent">
							<p>John 4</p>
							<span>Smith</span>
						</div>
					</div>
		            </div>
	            </div>
	            <div className="tutorReel__video">
		            <div className="tutorReel__video--wrapper">
		            <div className="tutorReel__tutor">
						<div className="tutorReel__leftcontent">
							<img src="https://picsum.photos/id/237/200/300" alt="avatar-icon" className="dark-icon icon--avatar" />
						</div>
						<div class="tutorReel__rightcontent">
							<p>John 5</p>
							<span>Smith</span>
						</div>
					</div>
		            </div>
	            </div>
	            <div className="tutorReel__video">
		            <div className="tutorReel__video--wrapper">
		            <div className="tutorReel__tutor">
						<div className="tutorReel__leftcontent">
							<img src="https://picsum.photos/id/237/200/300" alt="avatar-icon" className="dark-icon icon--avatar" />
						</div>
						<div class="tutorReel__rightcontent">
							<p>John 6</p>
							<span>Smith</span>
						</div>
					</div>
		            </div>
	            </div>
	            <div className="tutorReel__video">
		            <div className="tutorReel__video--wrapper">
		            <div className="tutorReel__tutor">
						<div className="tutorReel__leftcontent">
							<img src="https://picsum.photos/id/237/200/300" alt="avatar-icon" className="dark-icon icon--avatar" />
						</div>
						<div class="tutorReel__rightcontent">
							<p>John 6</p>
							<span>Smith</span>
						</div>
					</div>
		            </div>
	            </div>
	            <div className="tutorReel__video">
		            <div className="tutorReel__video--wrapper">
		            <div className="tutorReel__tutor">
						<div className="tutorReel__leftcontent">
							<img src="https://picsum.photos/id/237/200/300" alt="avatar-icon" className="dark-icon icon--avatar" />
						</div>
						<div class="tutorReel__rightcontent">
							<p>John 6</p>
							<span>Smith</span>
						</div>
					</div>
		            </div>
	            </div>
	            <div className="tutorReel__video">
		            <div className="tutorReel__video--wrapper">
		            <div className="tutorReel__tutor">
						<div className="tutorReel__leftcontent">
							<img src="https://picsum.photos/id/237/200/300" alt="avatar-icon" className="dark-icon icon--avatar" />
						</div>
						<div class="tutorReel__rightcontent">
							<p>John 6</p>
							<span>Smith</span>
						</div>
					</div>
		            </div>
	            </div>
	        </Slider>
        </div>
      </div>
	</>
    );
  }
}