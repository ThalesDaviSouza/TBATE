import { TokenService } from "./Infra/services/tokenService.js";
import { UserService } from "./Domain/services/userService.js";
import { CreateUserFacade } from "./Infra/facades/createUserFacade.js";
import { LoginUserFacade } from "./Infra/facades/loginUserFacade.js";
import { TokenADapterGoogle } from "./Infra/adapter/tokenAdapter/TokenAdapterGoogle.js";
import { TokenAdapter } from "./Infra/adapter/TokenAdapter.js";
import { RefreshTokenService } from "./Domain/services/refreshTokenService.js";
import { RefreshTokenFacade } from "./Infra/facades/refreshTokenFacade.js";

const userService = new UserService();
const refreshTokenService = new RefreshTokenService();

const tokenService = new TokenService();
const createUserFacade = new CreateUserFacade(userService);
const loginUserFacade = new LoginUserFacade(
  userService, 
  tokenService, 
  createUserFacade, 
  refreshTokenService
);
const refreshTokenFacade = new RefreshTokenFacade(
  refreshTokenService,
  tokenService,
  userService,
  loginUserFacade
);

export function getCreateUserFacade(){
  return createUserFacade;
}

export function getLoginUserFacade(){
  return loginUserFacade;
}

export function getTokenAdapter(): typeof TokenAdapter {
  return TokenADapterGoogle;
}

export function getRefreshTokenFacade(){
  return refreshTokenFacade;
}

export function getTokenService(){
  return tokenService;
}
