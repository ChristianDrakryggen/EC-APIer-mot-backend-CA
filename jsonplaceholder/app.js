//get many posts
const getPosts = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await res.json();
  document.getElementById("posts").innerHTML = data
    .map(
      (
        post
      ) => `<div style="border-bottom: 1px solid grey; padding-bottom: 20px">
    <p>${post.title}</p>
    <button onclick="updatePost(${post.id})">Update me</button>
    <button onclick="deletePost(${post.id})">Delete me</button>
  </div>`
    )
    .join("");
};

//post a post
const postPost = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "post",
    body: JSON.stringify({
      title: "hejsan",
      body: "hoppsan",
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  alert(JSON.stringify(data));
};

//update a post
const updatePost = async (id) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    method: "put",
    body: JSON.stringify({
      title: "tjohopp",
      body: "tjosvejs",
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  alert(JSON.stringify(data));
};

//delete a post
const deletePost = async (id) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    method: "delete",
  });
  const data = await res.json();
  alert(JSON.stringify(data));
};

window.addEventListener("load", () => {
  getPosts();
  document.querySelector("#post-button").addEventListener("click", postPost);
});
