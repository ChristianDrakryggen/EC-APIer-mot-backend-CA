const postsArray = [
  {
    title: "Post one",
    body: "This is post one",
  },
  {
    title: "Post two",
    body: "This is post two",
  },
];

const displayPosts = () => {
  document.body.innerHTML = postsArray
    .map((post) => `<p>${post.title}</p>`)
    .join("");
};

//Promise
const createPost = (post) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        if (post) {
          postsArray.push(post);
          resolve("Successfully added post");
        } else {
          throw "Post not set or not valid";
        }
      } catch (error) {
        reject(error);
      }
    }, 3000);
  });
};

//then and catch - handle promise

/*createPost()
  .then((res) => {
    console.log(res);
    displayPosts();
  })
  .catch((err) => alert(err));*/

//async await - handle promise
/*const fn = async () => {
  try {
    const res = await createPost();
    console.log(res);
    displayPosts();
  } catch (error) {
    alert(error);
  }
};

fn();

//async await with fetch (fetch is just a func that returns a promise)
const fetchPosts = async () => {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await res.json();
    console.log(data);
  } catch (error) {
    alert(error);
  }
};

fetchPosts();*/

//promise.all
const promise1 = fetch("https://jsonplaceholder.typicode.com/posts/1").then(
  (res) => res.json()
);

const promise2 = fetch("https://jsonplaceholder.typicode.com/posts/2").then(
  (res) => res.json()
);

const promise3 = fetch("https://jsonplaceholder.typicode.com/posts/3").then(
  (res) => res.json()
);

const promise4 = fetch("https://jsonplaceholder.typicode.com/posts/4").then(
  (res) => res.json()
);

const promise5 = fetch("https://jsonplaceholder.typicode.com/posts/5").then(
  (res) => res.json()
);

Promise.all([promise1, promise2, promise3, promise4, promise5]).then((data) =>
  console.log(data)
);
