import React, { useEffect } from 'react';
// import sections
import Hero from '../components/sections/Hero';
// import FeaturesTiles from '../components/sections/FeaturesTiles';
// import FeaturesSplit from '../components/sections/FeaturesSplit';
// import Testimonial from '../components/sections/Testimonial';
// import Cta from '../components/sections/Cta';
// import Input from '../components/elements/Input';
// import Button from '../components/elements/Button';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import copy from 'copy-to-clipboard';

const BASE_API_URL = 'http://nitr.one';

const Home = () => {
	const [longURL, setLongURL] = React.useState('');
	const [errorMessage, setErrorMessage] = React.useState('');
	const [availableMessage, setAvailableMessage] = React.useState('');
	const [customKey, setCustomKey] = React.useState('');
	const [showCustomisation, setShowCustomisation] = React.useState(false);
	const [shortURL, setShortURL] = React.useState('');
	const [showSnackbar, setShowSnackbar] = React.useState(false);

	const handleCloseSnackbar = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setShowSnackbar(false);
	};

	const submitURL = async () => {
		const response = await fetch(BASE_API_URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				url: longURL,
				customKey: showCustomisation ? customKey : null,
			}),
		}).catch((err) => setErrorMessage(err.message));
		const statusCode = response.status;
		const data = await response.json();
		if (statusCode === 400) {
			setErrorMessage(data.message);
		} else {
			setShortURL(data.key);
			setShowSnackbar(true);
		}
	};

	const onShowCustomisation = async () => {
		const response = await fetch(BASE_API_URL + '/exists', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				key: customKey,
			}),
		}).catch((err) => setErrorMessage(err.message));
		const statusCode = response.status;
		const data = await response.json();
		if (statusCode === 400) {
			setErrorMessage(data.message);
		} else {
			setAvailableMessage(data.message);
		}
	};
	const handleCopy = () => {
		copy(BASE_API_URL + '/' + shortURL);
	};
	useEffect(() => {
		if (errorMessage.length > 0) {
			setTimeout(() => {
				setErrorMessage('');
			}, 3000);
		}
		if (availableMessage.length > 0) {
			setTimeout(() => {
				setAvailableMessage('');
			}, 3000);
		}
	}, [errorMessage.length, availableMessage.length]);

	const action = (
		<>
			<Button color="secondary" size="small" onClick={handleCopy}>
				COPY
			</Button>
			<IconButton size="small" aria-label="close" color="inherit" onClick={handleCloseSnackbar}>
				<CloseIcon fontSize="small" />
			</IconButton>
		</>
	);

	return (
		<>
			<Hero className="illustration-section-01" />
			<div style={{ display: 'flex', gap: '1rem', margin: '1rem' }}>
				<TextField
					style={{ width: '100%' }}
					id="filled-basic"
					label="URL to shorten"
					variant="outlined"
					onChange={(e) => {
						setLongURL(e.target.value);
					}}
				/>
				<Button style={{ backgroundColor: '#5658DD' }} variant="contained" onClick={submitURL}>
					Shorten
				</Button>
			</div>
			<div style={{ display: 'flex', justifyContent: 'center' }}>
				<FormControlLabel
					control={
						<Switch
							color="default"
							checked={showCustomisation}
							onChange={() => setShowCustomisation((prevState) => !prevState)}
						/>
					}
					label="Show Customisation"
				/>
			</div>
			{showCustomisation && (
				<div style={{ display: 'flex', gap: '1rem', margin: '1rem' }}>
					<TextField
						style={{ width: '100%' }}
						id="filled-basic"
						label="Check Availability"
						variant="outlined"
						onChange={(e) => {
							setCustomKey(e.target.value);
						}}
					/>
					<Button style={{ backgroundColor: '#5658DD' }} variant="contained" onClick={onShowCustomisation}>
						Check
					</Button>
				</div>
			)}
			<Snackbar
				open={showSnackbar}
				onClose={handleCloseSnackbar}
				message={BASE_API_URL + '/' + shortURL}
				action={action}
			/>
			{errorMessage.length > 0 && (
				<Alert severity="error" style={{ display: 'flex', gap: '1rem', margin: '1rem' }}>
					{errorMessage}
				</Alert>
			)}
			{availableMessage.length > 0 && (
				<Alert severity="success" style={{ display: 'flex', gap: '1rem', margin: '1rem' }}>
					{availableMessage}
				</Alert>
			)}
			{/* <FeaturesTiles /> */}
			{/* <FeaturesSplit invertMobile topDivider imageFill className="illustration-section-02" /> */}
			{/* <Testimonial topDivider /> */}
			{/* <Cta split /> */}
			<div style={{ marginBottom: '4rem' }} />
		</>
	);
};

export default Home;
