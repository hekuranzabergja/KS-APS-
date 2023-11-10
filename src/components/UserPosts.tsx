import { Card, Spin } from 'antd';
import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from "react-router";
import './style.css'

type ResponseData = {
    limit: number;
    skip: number;
    total: number;
    posts: Post[];
  };
  

function UserPosts() {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [posts,setPosts]= useState<Post[]>([])
    const fetchUsers = useCallback(async () => {
        setIsLoading(true);
        const res = await fetch(`https://dummyjson.com/users/${id}/posts`);
    
        const data:ResponseData = await res.json();
    console.log(data);
        setIsLoading(false);
        setPosts(data.posts)
      }, []);
    
        useEffect(() => {
            fetchUsers();
        }, []);

        if (isLoading) {
            return <div><Spin/></div>;
          }
  return (
    <div>

        <div className='cardPost'>{posts?.map((post)=>{
            return (
                <Card title={post.title} bordered={true}  key={post.id} className="specificCard">
                <p><strong>Body:</strong> {post.body}</p>
                <p><strong>Reaction:</strong> {post.reactions}</p>
                <p><strong>Tags:</strong> {post.tags}</p>
              </Card>
            )
        })}</div>


    </div>
  )
}

export default UserPosts