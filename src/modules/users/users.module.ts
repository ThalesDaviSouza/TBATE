import { TokenService } from "./Infra/services/tokenService.js";
import { UserService } from "./Domain/services/userService.js";
import { CreateUserFacade } from "./Infra/facades/createUserFacade.js";
import { LoginUserFacade } from "./Infra/facades/loginUserFacade.js";

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
