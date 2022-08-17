import { Octokit } from "@octokit/rest" 

// github token method
export const octokit = new Octokit({      
  auth: process.env.REACT_APP_GH,     
});