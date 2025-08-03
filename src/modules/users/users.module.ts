import { CreateUserFacade } from "./Application/facades/createUserFacade.js";
import { LoginUserFacade } from "./Application/facades/loginUserFacade.js";
import { TokenService } from "./Domain/services/tokenService.js";
import { UserService } from "./Domain/services/userService.js";

const userService = new UserService();
const tokenService = new TokenService();
const createUserFacade = new CreateUserFacade(userService);
const loginUserFacade = new LoginUserFacade(userService, tokenService, createUserFacade);

export function getCreateUserFacade(){
  return createUserFacade;
}

export function getLoginUserFacade(){
  return loginUserFacade;
}

