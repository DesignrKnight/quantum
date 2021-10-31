[![Starware](https://img.shields.io/badge/Starware-⭐-black?labelColor=f9b00d)](https://github.com/zepfietje/starware)

# The Idea
National Institute of Technology, Rourkela teh Univeristy from where I graduated and this project is primarily intended for the folks of the university as the short name of University, `NITR` is the inspiration for the domain https://nitr.one. That being said, the project is without any questions open for all to be used. 

## About The Project

A completely serverless and blazing fast URL shortener for all your needs.

- Create short URLs
- Request custom prefix for add brand identity, like `yourdomain.nitr.one/someSuffix`.
- Free forever
- No limits on usage

Note:

- The project is still in beta and hence it is not recommended to be used yet for mission-critical scenario. 
- The UI is subject to change but the data and functionality will be kept intact


### Built With

Following technologies and libraries are used for the development of this
project.

- [Create React App](https://create-react-app.dev/)
- [Cloudflare Workers](https://workers.cloudflare.com/)
- [Material UI](https://mui.com/)
- [Cloudflare Pages](https://pages.cloudflare.com/)
- [Cloudflare Workers KV](https://developers.cloudflare.com/workers/learning/how-kv-works)
- [Auth0](https://a0.to/signup-for-auth0)

### General Project Dependencies
| Name  | Description  |   
|---|---|
| Cloudflare Page Rules  | To manage short URLs that have brand identity like `yourdomain.nitr.one`  |   
| Cloudflare DNS  | Domain is routed via Cloudflare   |  

### UI Dependencies
| Name  | Description  |   
|---|---|
| icons8  | icon of website  |   
| template  | based on theme by cruip.com   |  
| mui  | components of the UI  | 

### Server Dependencies
| Name  | Description  |   
|---|---|
| @cfworker/jwt  | JWT verification  |   
| itty-router  | Routing   |  
| nanoid  | generate shorten URL suffix  | 


## `Contributions are welcome 🎉🎉`

NOTE 1: Please abide by the [Contributing Guidelines](https://github.com/DesignrKnight/quantum/blob/main/CONTRIBUTING.md).

NOTE 2: Please abide by the [Code of Conduct](https://github.com/DesignrKnight/quantum/blob/main/CODE_OF_CONDUCT.md).


### Running the project.

The project uses NPM and not Yarn. It is strictly advised to stick with Yarn so as to avoid dependency conflicts down the line.

```
## Checkout into the project pages directory
cd client

## Install Dependencies
npm install

## Run the Project
yarn start

```

```
## Checkout into the project server directory
cd client

## Install Dependencies
npm install

NOTE: Setup wrangler-cli before next command
## Run the Project
wrangler dev

```

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Starware

dscnitrourkela/project-guava is Starware.
This means you're free to use the project, as long as you star its GitHub repository.
Your appreciation makes us grow and glow up. ⭐
