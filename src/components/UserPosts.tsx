import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from "react-router";

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
            return <div>Loading ...</div>;
          }
  return (
    <div>

        <div>{posts?.map((post)=>{
            return (
                <div key={post.id}>{post.title}</div>
            )
        })}</div>
    </div>
  )
}

export default UserPosts