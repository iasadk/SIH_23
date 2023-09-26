import { Blog } from "@/types/blog";

const blogData: Blog[] = [
  {
    id: 1,
    title: "REDUCE, REUSE, RECYCLE and REPAIR",
    paragraph:
      "Rapid advancement of technology has given rise to a significant environmental challenge: electronic waste.",
    image: "/images/blog/reduce-reuse-recycle.jpg",
    author: {
      name: "Samuyl Joshi",
      image: "/images/blog/author-01.png",
      designation: "Graphic Designer",
    },
    tags: ["creative"],
    publishDate: "2021",
  },
  {
    id: 2,
    title: "The problem of E-waste in India",
    paragraph:
      "India generates 3.2 million metric tons of e-waste per year, and this number is only expected to grow.",
    image: "/images/blog/e-waste-india.jpg",
    author: {
      name: "Musharof Chy",
      image: "/images/blog/author-02.png",
      designation: "Content Writer",
    },
    tags: ["Environmental"],
    publishDate: "2025",
  },
  {
    id: 3,
    title: "Educating the Next Generation",
    paragraph:
      "How can school districts incorporate educational programs into their schools? Several options are available.",
    image: "/images/blog/e-waste-edu.png",
    author: {
      name: "Lethium Deo",
      image: "/images/blog/author-03.png",
      designation: "Graphic Designer",
    },
    tags: ["Future"],
    publishDate: "2025",
  },
];
export default blogData;
