import React from 'react';
// import sections
import Hero from '../components/sections/Hero';
import FeaturesTiles from '../components/sections/FeaturesTiles';
import FeaturesSplit from '../components/sections/FeaturesSplit';
import Testimonial from '../components/sections/Testimonial';
import Cta from '../components/sections/Cta';
import Input from '../components/elements/Input';
import Button from '../components/elements/Button';

const BASE_API_URL = 'http://127.0.0.1:8787';
const Home = () => {
	const [longURL, setLongURL] = React.useState('');
	const [showShortURL, setShowShortURL] = React.useState(false);
	const [shortURL, setShortURL] = React.useState('');
	const submitURL = () => {
		fetch(BASE_API_URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				url: longURL,
			}),
		})
			.then((res) => res.json())
			.then((res) => setShortURL(res.key))
			.catch(console.log);
	};
	return (
		<>
			<Hero className="illustration-section-01" />
			<div style={{ display: 'flex' }}>
				<Input
					style={{ width: '1fr' }}
					id="longurl"
					type="url"
					label="Shorten"
					labelHidden
					hasIcon="right"
					placeholder="Enter URL to shorten"
					onChange={(e) => {
						setLongURL(e.target.value);
					}}
				/>{' '}
				<Button onClick={submitURL}>Shorten</Button>
			</div>
			<span className="testimonial-item-name text-color-high">{BASE_API_URL}</span>
			<span className="text-color-low"> / </span>
			<span className="testimonial-item-link">
				<a href={BASE_API_URL + '/' + shortURL} target="_blank" rel="noopener noreferrer">
					{shortURL}
				</a>
			</span>
			<p>{shortURL}</p>
			{/* <FeaturesTiles /> */}
			<FeaturesSplit invertMobile topDivider imageFill className="illustration-section-02" />
			{/* <Testimonial topDivider /> */}
			{/* <Cta split /> */}
		</>
	);
};

export default Home;
