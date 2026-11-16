const blogs = [
  {
    id: 1,
    title: "Vibe coding a new career",
    author: "Dario",
    url: "https://www.anthropic.com/",
    likes: 0,
  },
  {
    id: 2,
    title: "The Saab 900",
    author: "Jürgen",
    url: "htts://saab.com",
    likes: 75,
  },
  {
    id: 3,
    title: "Building a GPS system for lost penguins",
    author: "Ahti",
    url: "htts://maps.google.com",
    likes: 5,
  },
];

let nextId = 4;

export const getBlogs = () => {
  return blogs;
};

export const getBlogById = (id: number) => blogs.find((blog) => blog.id === id);

export const incrementLike = (id: number) => {
  const blog = getBlogById(id);
  if (blog) {
    blog.likes++;
  }
};

export const addBlog = (title: string, author: string, url: string) => {
  blogs.push({ id: nextId++, title, author, url, likes: 0 });
};
