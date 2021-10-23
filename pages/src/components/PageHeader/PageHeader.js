/*!

=========================================================
* BLK Design System React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/blk-design-system-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/blk-design-system-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from 'react';
import {
	Button,
	Label,
	FormGroup,
	CustomInput,
	Input,
	InputGroupAddon,
	InputGroupText,
	InputGroup,
	Container,
	Row,
	Col,
} from 'reactstrap';

// reactstrap components
// import { Container } from 'reactstrap';

export default function PageHeader() {
	return (
		<div className="page-header header-filter">
			<div className="squares square1" />
			<div className="squares square2" />
			<div className="squares square3" />
			<div className="squares square4" />
			<div className="squares square5" />
			<div className="squares square6" />
			<div className="squares square7" />
			<Container>
				<div className="content-center brand">
					<Col lg="12" sm="24">
						<FormGroup>
							<Input defaultValue="" placeholder="Regular" type="text" />
						</FormGroup>
					</Col>
					{/* <h1 className="h1-seo">I create noice and easy to remember URLs for you.</h1> */}
				</div>
			</Container>
		</div>
	);
}
