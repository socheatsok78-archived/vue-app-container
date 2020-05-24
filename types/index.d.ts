import { VueConstructor } from 'vue/types'
import { AxiosStatic } from "axios/index";

declare type HeaderOptions = {
    [key: string]: string
}

declare type ConfigOptions = {
    baseURL?: string,
    timeout?: Number,
    headers?: HeaderOptions
}

declare type AppOptions = {
    name?: string,
    config?: ConfigOptions
}

declare type Service = {
    [key: string]: Function
}

declare type ServiceRegistry = ($http: AxiosStatic, $config: Config) => Service;

declare type ContainerReadyCallback = ($app: AppContainer) => Function;

declare type ConfigChangeCallback = (config: Config) => Function;

export default class AppContainer {
    /**
    * Create a new instance of AppContainer
    * @param {AppOptions} app
    */
    constructor(app: AppOptions);

    /**
    * @returns {Config}
    */
    get config(): Config;

    /**
    * @returns {ServiceContainer}
    */
    get services(): ServiceContainer;

    /**
    * @returns {AxiosStatic}
    */
    get http(): AxiosStatic;

    /**
    * Register on container ready callback
    * @param {ContainerReadyCallback} callback
    * @returns {Function} Stop listen for the callback
    */
    static ready(callback: ContainerReadyCallback): Function;
}

export class ServiceContainer {
    /**
     * Create new instance of Service Container
     * @param {Http} http
     */
    constructor(http: Http);

    /**
     * @returns {Http}
     */
    get $http(): Http;

    /**
     * Register a new service
     *
     * @param {string} name Service Name
     * @param {ServiceRegistry} service Service Registry Instance
     */
    register(name: string, service: ServiceRegistry): void;
}

export class VueAppContainerPlugin {
    /**
     * Install App Container Plugin
     * @param {VueConstructor} Vue
     */
    static install(Vue: VueConstructor): void;
}

class Config {
    /**
     * Create new config instance
     * @param {ConfigOptions} config
     */
    constructor(config: ConfigOptions);

    /**
     * Update configuration
     * @param {ConfigOptions} config
     */
    update(config: ConfigOptions, fireEvent: boolean): void;

    /**
     * Clone a remote configuration file
     * @param {string} url Remote config URL
     */
    clone(url: string): void;

    /**
     * Register on config update callback
     * @param {ConfigChangeCallback} callback
     */
    change(callback: ConfigChangeCallback): Function;
}

class Http {
    /**
     * Create a new instance of Http
     * @param {Config} config
     */
    constructor(config: Config);

    /**
     * @returns {AxiosStatic}
     */
    get instance(): AxiosStatic;

    /**
     * @returns {Config}
     */
    get config(): Config;
}
