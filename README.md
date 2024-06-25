
# Articles - LigaData

This is a frontend application created with the help of Reactjs that allows users to fetch articles, perform CRUD (Create, Read, Update, Delete) operations on them, and authenticate using JWT (JSON Web Token). The backend is powered by MongoDB and Express.js.


## Features

- User Authentication: Sign up, log in, and log out functionalities using JWT.
- CRUD Operations on Articles: Users can create, read, update, and delete articles.
- Article Fetching: Fetch and display a list of articles from the backend.

## Tech Stack
- Frontend : React.js, React Bootstrap, HTML, CSS
- Backend : Node.js, Express.js
- Database : MongoDB
- Authentication : JSONWEBTOKEN
- Validation : JOI Library


## 🔗 Links
[![JIRA]([https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://katherineoelsner.com/](https://sanobarfatima96.atlassian.net/jira/software/projects/KAN/boards/1))
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)]([https://www.linkedin.com/sanobarfatema11](https://www.linkedin.com/in/sanobarfatema11/))


## Installation

Install my-project with npm

```bash
  npm install my-project
  cd my-project
```
    
## API Reference

### Authentication
POST /auth/signup: Sign up a new user.
POST /auth/login: Log in an existing user.

#### Get all articles

```http
  GET /articles : Get all the articles with user authentication
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
|           | `Array Object` | **Required**. JWTToken|

#### CREATE article

```http
  POST /articles/new - body : title, content, date
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
|           | `Object` | **Required**. Token for authenticated users |

#### UPDATE article

```http
  PUT /article/update/id 
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
|   id      | `Object` | **Required**. Token for authenticated users |

#### CREATE article

```http
  DELETE /article/delete/id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
|     id    | `Object` | **Required**. Token for authenticated users |

## Usage 
### Managing Articles
- Once logged in, navigate to the articles page.
- You can create a new article by clicking the "Add Article" button.
- Each article will have options to view, edit, or delete.

## Contact
For any questions or suggestions, please contact:

Name: Sanobar Fatema
Email: sanobarfatima96@example.com
GitHub: sanobaaar

