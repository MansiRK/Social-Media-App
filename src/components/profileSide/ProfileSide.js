import React from "react";
import FollowersCard from "../followersCard/FollowersCard";
import LogoSearch from "../logosearch/LogoSearch";
import ProfileCard from "../profileCard/ProfileCard";
import './ProfileSide.css';
export default function ProfileSide(){
    return(
        <div className="ProfileSide">
            <LogoSearch/>
            <ProfileCard/>
            <FollowersCard/>

        </div>
    )
}