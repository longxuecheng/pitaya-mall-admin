import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom'


export interface IUserDetailProps extends RouteComponentProps<{username:string}> {
  
}

export class UserDetailPage extends React.Component<IUserDetailProps>{

  public componentDidMount(){
    // console.log(this.props.match)
  }

  public render(){
    
    return (
      
    <div>
      fsdfsd
      {/* <div>User path:{this.props.match.params.username}</div>
      <div>User path:{this.props.match.path}</div>
      <div>User url:{this.props.match.url}</div> */}
      
    </div>
    )
  }
}