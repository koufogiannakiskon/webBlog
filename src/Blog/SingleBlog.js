import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button } from "@mui/material";

const SingleBlog = () => {
  const [singleBlogPost, setSingleBlogPost] = useState([]);
  let navigate = useNavigate();

  let { id } = useParams();
  const contentful = require("contentful");
  const client = contentful.createClient({
    space: "7djp8gpgnxpz",
    environment: "master", // defaults to 'master' if not set
    accessToken: "bVVIaiB9jYIxlHPtlg2hPH2BTRDV7J3Ip47pgjzvBaM",
  });

  useEffect(() => {
    const getEntryById = async () => {
      try {
        await client.getEntry(id).then((entries) => {
          setSingleBlogPost(entries);
        });
      } catch (error) {
        console.log(`Error fetching authors ${error}`);
      }
    };
    getEntryById();
  }, [id]);
  console.log("singleBlogPost", singleBlogPost);
  return (
    <div id="layout" className="pure-g">
      <div className="content pure-u-1 pure-u-md-3-4">
        <div>
          <div className="posts">
            <Link to="/blogList" className="content-subhead">
              Blog Posts
            </Link>

            <section className="post">
              <header className="post-header">
                <img
                  src={singleBlogPost?.fields?.blogImage?.fields?.file?.url}
                  title=""
                  alt={singleBlogPost?.fields?.title}
                  width="578"
                  height="291"
                />
                <h2 className="post-title pt-3">
                  {singleBlogPost?.fields?.title}
                </h2>
                <p className="post-meta">
                  By{" "}
                  <a href="https://thecodeangle.com/" className="post-author">
                    {singleBlogPost?.fields?.blogAuthor}
                  </a>{" "}
                  Date <span></span>
                  <small>
                    {singleBlogPost?.fields?.createDate === undefined
                      ? "loading"
                      : new Intl.DateTimeFormat("en-GB", {
                          month: "long",
                          day: "2-digit",
                          year: "numeric",
                        }).format(new Date(singleBlogPost?.fields?.createDate))}
                  </small>
                </p>
              </header>
              <div className="post-description">
                {/* <MD source={singleBlogPost?.fields?.blogContent} /> */}
                <ReactMarkdown>
                  {singleBlogPost?.fields?.blogContent}
                </ReactMarkdown>
              </div>
            </section>
          </div>
          <div className="footer">
            <div className="pure-menu pure-menu-horizontal">
              <div className="pure-menu-item">
                <Button onClick={() => navigate(-1)}>
                  <ArrowBackIcon />
                  Back
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleBlog;
