import React, { useEffect, useState } from "react";
import { createClient } from "contentful";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";

const subHeader = (author, date) => {
  return `By ${author} | ${date}`;
};

const BlogList = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const client = createClient({
    space: "7djp8gpgnxpz",
    environment: "master", // defaults to 'master' if not set
    accessToken: "bVVIaiB9jYIxlHPtlg2hPH2BTRDV7J3Ip47pgjzvBaM",
  });

  useEffect(() => {
    const getAllEntries = async () => {
      try {
        await client.getEntries().then((entries) => {
          setBlogPosts(entries);
        });
      } catch (error) {
        console.log(`Error fetching authors ${error}`);
      }
    };
    getAllEntries();
  }, []);
  console.log("blogPosts", blogPosts);

  return (
    <div id="layout" className="pure-g">
      <div className="content pure-u-1 pure-u-md-3-4">
        <div>
          <div className="posts">
            <Typography variant="h3" className="content-subhead">
              Web Blog
            </Typography>

            {blogPosts?.items?.map((post) => (
              <Card
                className="post"
                key={post.sys.id}
                sx={{ paddingBottom: "0px" }}
              >
                <CardMedia
                  component="img"
                  height="291"
                  image={post.fields.blogImage.fields.file.url}
                  alt={post.fields.blogTitle}
                />
                <CardHeader
                  title={post.fields.blogTitle}
                  className="post-title pt-3"
                  subheader={subHeader(
                    post.fields.blogAuthor,
                    post.fields.createdDate
                  )}
                ></CardHeader>
                <CardContent>
                  <Typography>{post.fields.blogSummary}</Typography>
                  <Link
                    to={`/blogDetails/${post.sys.id}`}
                    className="button button1"
                  >
                    <Typography>Read More</Typography>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="footer">
            <div className="pure-menu pure-menu-horizontal">
              <div className="pure-menu-item">
                <a
                  href="https://www.koufogiannakis.com/"
                  className="pure-menu-link"
                >
                  Koufogiannakis Konstantinos
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogList;
