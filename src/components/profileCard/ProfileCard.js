import React from "react";
import Cover from '../../img/cover.jpg'
import Profile from '../../img/profileImg.jpeg'
import './ProfileCard.css'
export default function ProfileCard() {
    return (
        <div className="ProfileCard">
            <div className="ProfileImages">
                <img src={Cover} alt="" />
                <img src={Profile} alt="" />
            </div>
            <div className="ProfileName">
                <span>Riddhi Zavare</span>
                <span>Fullstack Developer</span>
            </div>

            <div className="followStatus">
                <hr />
                <div>
                    <div className="follow">
                        <span>100</span>
                        <span>Followings</span>
                    </div>
                    <div className="vl"></div>
                    <div className="follow">
                        <span>1</span>
                        <span>Followers</span>
                    </div>
                </div>
                <hr />
            </div>
            <span>My Profile</span>
        </div>
    )
}