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

const createPost = (post, callback) => {
  setTimeout(() => {
    postsArray.push(post);
    console.log(postsArray);
    callback();
  }, 3000);
};

/*
createPost({
  title: "Post three",
  body: "This is post three",
});
displayPosts();
*/

createPost(
  {
    title: "Post three",
    body: "This is post three",
  },
  displayPosts
);
