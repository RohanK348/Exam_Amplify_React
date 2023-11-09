import React from 'react'
import posts from '../json/posts.json'
import comments from '../json/comments.json'
import Widget from '../components/social-feed/widget'
import Widget2 from '../components/user-widgets/widget-2'
import Friends from '../components/social-feed/friends'
import Posts from '../components/social-feed/posts'

const Index = () => {
  return (
    <Widget>
      <div className="w-full mb-4">
        <Widget2 />
      </div>
      <div className="flex flex-col lg:flex-row lg:flex-wrap">
        <div className="w-full lg:w-3/4">
          <Posts items={posts} comments={comments} />
        </div>
        <div className="w-full lg:w-1/4">
          <Friends />
        </div>
      </div>
    </Widget>
  )
}
export default Index
