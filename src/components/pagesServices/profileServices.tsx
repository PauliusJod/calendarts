import React, { useEffect, useState } from "react";
import axios from "axios";
import Constants from "../../utilities/Constants";
import { IGroupCreate, IGroupGet } from "../../typings/GroupProps";
import { AuthService } from "../../services/authservice";

const instance = new AuthService({}, {});

export function GetAllGroupsByOwnership(): Promise<IGroupGet[]> {
  const userInfo = instance.getCurrentUser();
  const headers = {
    Authorization: `Bearer ${userInfo.accessToken}`,
  };
  return axios
    .get(Constants.API_URL_GET_GROUPS_BY_OWNERSHIP, { headers })
    .then((response) => {
      const groupsData = response.data as IGroupGet[];
      const groupsDefault = groupsData.map((group) => ({
        ...group,
        isVisible: false,
      }));

      return groupsDefault;
    })
    .catch((err) => {
      console.log(err);
      return [] as IGroupGet[];
    });
}

export async function CreateGroup(groupName: string, groupDescription: string) {
  const userInfo = instance.getCurrentUser();
  const headers = {
    Authorization: `Bearer ${userInfo.accessToken}`,
  };
  return axios
    .post(
      Constants.API_URL_CREATE_GROUP,
      {
        groupName,
        groupDescription,
      },
      { headers }
    )
    .then((response) => {
      console.log("response: ", response.data);
      console.log("response: ", response);
      return { data: response.data, status: response.status };
    })
    .catch((err) => {
      console.log("error: ", err);
      return {
        statusCode: err.request.status,
        statusMessage: err.response.data,
      };
    });
}
