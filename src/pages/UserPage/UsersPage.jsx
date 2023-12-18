import { useState, useEffect } from "react";
import * as usersAPI from "../../utilities/users-api";

useEffect(function () {
    async function getUsers() {
      const users = await usersAPI.getAll();
      setUsers(users);
    }
    getUsers();
  }, []);