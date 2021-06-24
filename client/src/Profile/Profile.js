import { useSelector } from "react-redux";
import Navigation from "../Navigation/Navigation";
import PortalToBody from "../Navigation/Portal";
import SituationForm from "./SituationForm/SituationForm";
import React, { useEffect, useState } from "react";
import ProfileCircle from "./ProfileCircle";
import classes from "./Profile.module.css";

import BackgroundProfile from "./Background/BackgroundProfile";

function Profile(props) {
  const currentUser = useSelector((state) => state.currentUser);
  const circles = useSelector((state) => state.circles);
  const mycircles = circles.filter((c) =>
    currentUser.connected_circles.includes(c._id)
  );

  return currentUser ? (
    <>
      <div className={classes.profile}>
        <div className={classes.container}>
          <h2 className={classes.profile_header}>
            {currentUser.firstName} {currentUser.lastName}
          </h2>
          <p className={classes.text}>{currentUser.situation}</p>
          <p className={classes.situation_description}>* Это ваша текущая ситуация, отправляется людям вместе с вашим контактом</p>
          <div className={classes.input_profile}>
            <SituationForm />
          </div>
        </div>
      </div>

      <div className={classes.wrapper}>
        {mycircles?.map((el) => {
          return (
            <ProfileCircle currentUser={currentUser} info={el} key={el._id} />
          );
        })}
      </div>
      <BackgroundProfile />
      <PortalToBody>
        <Navigation name="На главную" link="/" />
      </PortalToBody>
    </>
  ) : null;
}

export default Profile;
