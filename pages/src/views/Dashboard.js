import React, { useEffect } from 'react';
// import sections
import Hero from '../components/sections/Hero';
// import FeaturesTiles from '../components/sections/FeaturesTiles';
// import FeaturesSplit from '../components/sections/FeaturesSplit';
// import Testimonial from '../components/sections/Testimonial';
// import Cta from '../components/sections/Cta';
// import Input from '../components/elements/Input';
// import Button from '../components/elements/Button';
import { useAuth0 } from '@auth0/auth0-react';

import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

// const BASE_API_URL = 'https://nitr.one';
// const BASE_URL = 'nitr.one';
// const URL_SCHEME = 'https';

const BASE_API_URL = 'http://127.0.0.1:8787';
const BASE_URL = '127.0.0.1:8787';
const URL_SCHEME = 'http';

const AUTH0_DOMAIN = 'nitrone.eu.auth0.com';

const Dashboard = () => {
	const { isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();

	const [prefix, setPrefix] = React.useState('');
	const [URL, setURL] = React.useState('');
	const [justification, setJustification] = React.useState('');
	const [accessToken, setAccessToken] = React.useState();

	const getAccessToken = async () => {
		const accessToken = await getAccessTokenSilently({
			audience: `https://${AUTH0_DOMAIN}/api/v2/`,
			scope: 'read:current_user',
		});
		setAccessToken(accessToken);
	};

	useEffect(() => {
		getAccessToken();
	}, []);

	const onSubmit = async () => {
		console.log('onSubmit');
	};

	if (!isLoading && !isAuthenticated) {
		return (
			<>
				<Hero className="illustration-section-01" />
				<div style={{ display: 'flex', justifyContent: 'center' }}>You are not logged in.</div>
			</>
		);
	}

	return (
		<>
			<Hero className="illustration-section-01" />

			<div style={{ margin: '1rem', display: 'flex', alignItems: 'baseline' }}>
				<TextField
					id="outlined-multiline-flexible"
					label="Prefix"
					value={prefix}
					onChange={(event) => setPrefix(event.target.value)}
				/>
				<p>.nitr.one</p>
				<TextField
					value={URL}
					onChange={(event) => setURL(event.target.value)}
					style={{ marginLeft: '24px' }}
					id="outlined-textarea"
					label="Default URL"
					placeholder="Placeholder"
					helperText="The base URL yourdomain.nitr.one will redirect here"
				/>
			</div>

			<TextField
				value={justification}
				onChange={(event) => setJustification(event.target.value)}
				style={{ margin: '1rem' }}
				id="outlined-multiline-static"
				label="Justification"
				multiline
				rows={4}
				helperText="Provide detailed explanantion as to why you should have this custom prefix. This is to prevent conflict of interest. Using official mail id helps in process"
			/>
			<div style={{ marginLeft: '1rem' }}>
				<Button style={{ backgroundColor: '#5658DD' }} variant="contained" onClick={onSubmit}>
					Apply
				</Button>
			</div>
			{/* <FeaturesTiles /> */}
			{/* <FeaturesSplit invertMobile topDivider imageFill className="illustration-section-02" /> */}
			{/* <Testimonial topDivider /> */}
			{/* <Cta split /> */}
			<div style={{ marginBottom: '4rem' }} />
		</>
	);
};

export default Dashboard;
