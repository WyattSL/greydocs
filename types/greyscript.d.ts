// Generated from _data/functions.json, _data/arguments.json, _data/returns.json and _data/descriptions.json
// Run: python generate_types.py

declare namespace GreyHack {
  interface CTFEvent {
    /**
     * Returns a string with the name of the mission creator.
     */
    get_creator_name(): string;

    /**
     * Returns a string with the description set from set_config
     */
    get_description(): string;

    /**
     * Returns a string with the content of the email that the player will receive upon accepting the mission.
     */
    get_mail_content(): string;

    /**
     * Returns a string with the public address of the rented server used as a template for the event.
     */
    get_template(): string;

    /**
     * This function is to be called when the player successfully completes the mission. When it is completed, the player and the event creator will receive a reward. THe more players complete the mission, the higher the mission scores, and the higher the rewards are for the creator & player. Returns false if the player has not accepted the mission or has already completed it, true otherwise.
     */
    player_success(): boolean;
  }

  interface Blockchain {
    /**
     * Returns an int with the number of units of the coin that have been mined in total.
     */
    amount_mined(coinName: string): number;

    /**
     * Returns an int with the current unit value of the currency. In case of an error, a string is returned with the details.
     */
    coin_price(coinName: string): number | string;

    /**
     * Returns an object of type wallet, used to manage cryptocurrencies. In case of a error, a string is returned with the details.
     */
    create_wallet(username: string, password: string): Wallet | string;

    /**
     * Remove a crypto currency from the world. The credentials used in the creation of the currency are necessary.
     */
    delete_coin(coinName: string, username: string, password: string): null;

    /**
     * Returns an object of type Coin used to manage the currency. A string with the details is returned in case of an error.
     */
    get_coin(coinName: string, username: string, password: string): Coin | string;

    /**
     * Returns a wallet type object or a string in the event of an error, indicating the reason.
     */
    login_wallet(username: string, password: string): Wallet | string;

    /**
     * Returns a map with the latest changes in the value of a specific currency. The Key of the map is the index represented by an int. Value contains a list, where index 0 is the price of the coin it had in the past, index 1 indicates the date on which the price change occurred.
     */
    show_history(coinName: string): Map;
  }

  interface Wallet {
    /**
     * Publish a purchase offer indicating the number of coins you wish to buy and the price ($) per unit you are willing to pay. The purchase will be finalized if there is any sale offer with a price less than or equal to the one proposed in the purchase. If there is no eligible offer to sell at that time, the offer to buy will remain publicly visible until a new offer to sell satisfies the requirements. If the publication has been successful, true is returned, in case of error a string with the details is returned.
     */
    buy_coin(currencyName: string, quantity: number, UnitPrice: number): number | string;

    /**
     * Cancel any pending offer of a certain coin.
     */
    cancel_pending_trade(currencyName: string): null;

    /**
     * Returns an int with the number of coins of a given currency. In case of error, a string with the details is returned.
     */
    get_balance(coinName: string): number | string;

    get_global_offers(currencyName: string): Map;

    get_pending_trade(currencyName: string): List;

    /**
     * Returns a string with a PIN that refreshes every few minutes. This PIN is used to obtain an account in cryptocurrency services.
     */
    get_pin(): string;

    /**
     * Returns a string list with the names of the coins available in the wallet.
     */
    list_coins(): string[];

    /**
     * Returns a string list with the names of all the currencies that exist.
     */
    list_global_coins(): string[];

    /**
     * Change the password of the wallet. Only the account owner can change the password. Returns true if the process completed successfully, in case of error a string with the details is returned
     */
    reset_password(newPassword: string): number | string;

    /**
     * Publish a sale offer indicating the amount of coins you want to sell and the price ($) per unit you want to assign. The sale will be finalized if there is any purchase offer with a price greater than or equal to that proposed in the sale. If there is no existing offer to buy that matches the requirements at that time, the offer to sell will remain publicly visible until a new offer to buy satisfies the requirements. If the publication has been successful, true is returned, in case of error a string with the details is returned.
     */
    sell_coin(currencyName: string, quantity: number, UnitPrice: number): number | string;

    /**
     * Returns an int indicating the number of devices mining a specific coin for the same wallet. In case of error a string is returned with the details.
     */
    show_nodes(coinName: string): number | string;
  }

  interface Coin {
    /**
     * Reset the password for this coin.
     */
    reset_password_coin(newPassword: string): number | string | null;

    /**
     * Register a new account in the Coin that can be used to manage services such as stores. It is necessary to use the PIN that the owner of the wallet that wants to register has to provide.
     */
    create_subwallet(walletID: string, pin: string, subWalletUser: string, subWalletPass: string): null;

    /**
     * Returns the configured address that will be shown to users who do not have the currency, indicating where they have to register.
     */
    get_address(): string;

    /**
     * Returns an int with the number of hours (game time) that each mining cycle lasts. When a cycle ends, it is decided who gets the reward (1 coin) and the next cycle begins.
     */
    get_cycle_mining(): number;

    /**
     * Returns an int with the number of coins that have been mined so far.
     */
    get_mined_coins(): number;

    /**
     * Returns an int with the number of coins that will be received as a reward after each mining cycle.
     */
    get_reward(): number;

    /**
     * Returns an object of type SubWallet, in case of error it returns a string with the details.
     */
    get_subwallet(subWalletUser: string): SubWallet;

    /**
     * Returns a list of objects of type SubWallet with all the accounts registered in the crypto currency, in case of error it returns a string with the details.
     */
    get_subwallets(): SubWallet[];

    /**
     * Configure a valid address that will be shown to users who do not have the currency, indicating where to register.
     */
    set_address(address: string): null;

    /**
     * Assign the hours (game time) that each mining cycle lasts. When a cycle ends, it is decided who gets the reward (1 coin) and the next cycle begins
     */
    set_cycle_mining(rateHours: number): null;

    /**
     * Assign the reward that miners will receive after each mining cycle
     */
    set_reward(coinAmount: number): null;

    /**
     * Make a transaction of the currency between the indicated subwallets. In case of error, a string with the details is returned.
     */
    transaction(origSubWallet: string, destSubWallet: string, amount: number): number | string;
  }

  interface SubWallet {
    /**
     * Returns true if the credentials are correct, false otherwise.
     */
    check_password(subWalletPass: string): number;

    /**
     * Delete the account registered in the crypto currency. Returns true on success or a string with the details of the error. It can return false if the account to be deleted does not exist.
     */
    delete(): number | string;

    /**
     * Returns an int with the amount of coins that the Subwallet has. In case of error, a string with the details is returned
     */
    get_balance(): number | string;

    /**
     * Returns a string with the information stored by the coin creator
     */
    get_info(): string;

    /**
     * Returns a string with the username associated with this subwallet
     */
    get_user(): string;

    /**
     * Returns a list with the information of the last transaction. Index 0 is a string with the other subWallet. Index 1 is an int with the amount. Index 2 is an int with the direction of the transaction (0 Deposit, 1 Withdrawal). Index 3 is a string indicating the date of the transaction
     */
    last_transaction(): Map;

    /**
     * Starts the process of mining the cryptocurrency. The process leaves the terminal busy until a coin is mined, returning true
     */
    mining(): null;

    /**
     * Optional information that the coin creator can store in the Subwallet for any use.
     */
    set_info(info: string): null;

    /**
     * Returns a string with the name of the wallet to which this subwallet belongs.
     */
    wallet_username(): string;
  }

  interface Service {
    /**
     * Installs the necessary files for the correct functioning of the service and starts it. Returns true if the installation has been completed successfully, in case of error a string with the details is returned.
     */
    install_service(): number | string;

    /**
     * Start the service and open its associated port on the local machine. The service needs portforward in the router to be accessible from the outside. Returns true if the service has started correctly, in case of error a string with the details is returned
     */
    start_service(): number | string;

    /**
     * Stop the service and close its associated port on the local machine. Returns true if the service has been stopped correctly, in case of error a string with the details is returned
     */
    stop_service(): number | string;
  }

  interface Shell {
    /**
     * Connect to a remote service. You can specify 'ftp' in the serviceType to request a FtpShell
     *
     * Returns a Shell or FtpShell if the connection has been established correctly or null on failure.
     */
    connect_service(ipAddress: string, port: number, user: string, password: string, service?: string): Shell | FtpShell | string;

    /**
     * Launch an active terminal from the Shell.
     */
    start_terminal(): string | null;

    /**
     * Copy a file from one computer to the other through the network.
     *
     * Returns 1 on success, or a string (containing an error) on failure.
     */
    scp(pathOrig: string, pathDest: string, remoteShell: Shell): number | string | null;

    /**
     * Compile the source code of the file that is in the provided path, and save the executable in the destination path.
     * The name of the executable is the same as that of the source file without the extension.
     * The provided paths must be absolutes.
     *
     * Returns a string (empty on success, or with an error on failure)
     */
    build(pathSource: string, pathBinary: string, allowImport?: number): number | string;

    /**
     * Launches the command in the provided path.
     *
     * Returns null on success, or 0 on failure.
     */
    launch(path: string, args: string): number | string;

    /**
     * Returns the computer associated with the Shell.
     */
    host_computer(): Computer | null;

    /**
     * Returns true if the remote address could be reached, false otherwise. Firewalls do not block ping requests.
     */
    ping(ipAddress: string): number | string | null;

    /**
     * Connect to a remote server, regardless of any security.
     *
     * **This requires moderator permissions on Multiplayer, and is unavailable in Singleplayer.*
     */
    masterkey(ipAddress: string, Port: number, User: string): Shell | null;

    /**
     * Connect to a remote server, regardless of any security. Differences unknown from normal masterkey.
     *
     * **This requires moderator permissions on Multiplayer, and is unavailable in Singleplayer.*
     */
    masterkey_direct(publicIpAddress: string, localIpAddress: string, User: string): Shell | null;

    /**
     * Restore a network to it's original state, presumedly as would be done with ConfigLan.
     *
     * **This requires moderator permissions on Multiplayer, and is unavailable in Singleplayer.*
     */
    restore_network(publicIpAddress: string): any;
  }

  interface AptClient {
    /**
     * Shows all packages available in repository
     * The repository MUST be added in the /etc/apt/sources.txt file.
     *
     * Returns string with all pachages on success, or a string (containing an error) on failure.
     */
    show(repository_name: string): string;

    /**
     * Search specifically for the package in any of the repositories listed in /etc/apt/sources.txt
     *
     * Returns either a string with information about the package, or a string (containing an error) on failure.
     */
    search(package_name: string): string;

    /**
     * Update the list of available packages after adding a new repository in /etc/apt/sources.txt, or if the remote repository has updated its information in /server/conf/repod.conf
     *
     * Returns string containing all repository addresses with 'Updated' prefix on success, or a string (containing an error) on failure.
     */
    update(): string;

    /**
     * Add the repository address in the /etc/apt/sources.txt file
     *
     * Returns empty string on success, or a string (containing an error) on failure.
     */
    add_repo(repository_address: string, port?: number): string;

    /**
     * Remove the repository address in the /etc/apt/sources.txt file.
     *
     * Returns empty string on success, or a string (containing an error) on failure.
     */
    del_repo(repository_address: string): string;

    /**
     * Install the program or library from a remote repository listed in /etc/apt/sources.txt.
     * Unless a path is specified, the program installs in /lib if it is a library or in /bin otherwise
     *
     * Returns a string (containing an error) on failure or empty on success.
     */
    install(package_name: string, install_path?: string): string;

    /**
     * Check if there is a newer version of the file in the repository.
     *
     * Returns 1 or 0 if an update is or is not found respectively, or a string (containing an error) on failure.
     */
    check_upgrade(file_path: string): number | string;
  }

  interface MetaMail {
    /**
     * Get all mails
     *
     * Returns a string type list of the received emails, with a content preview. In case of error, it returns a string.
     */
    fetch(): string[] | string;

    /**
     * Read the full mail. The mail_ID argument can be obtained with fetch method.
     *
     * Returns either the content as a string or an error message.
     */
    read(mail_id: string): string;

    /**
     * Send a new mail to the indicated recipient.
     *
     * Returns 1 if the mail has been sent correctly, otherwise returns a string with the error.
     */
    send(address: string, subject: string, message: string): number | string;

    /**
     * Delete the mail that corresponds with mail_ID.
     *
     * Returns 1 if it was removed successfully or a string with the error message.
     */
    delete(mail_id: string): number | string;
  }

  interface FtpShell {
    /**
     * Launch an active terminal from the FtpShell.
     */
    start_terminal(): string | null;

    /**
     * Returns the computer associated with the FtpShell.
     */
    host_computer(): Computer | null;

    /**
     * Copy a file from one computer to the other through the network.
     *
     * Returns 1 on success, or a string (containing an error) on failure.
     */
    put(pathOrig: string, pathDest: string, remoteShell: Shell): number | string | null;
  }

  interface Crypto {
    /**
     * Returns a string with the password generated from the file created by aireplay.
     */
    aircrack(pathFile: string): string | null;

    /**
     * Enables or disables the monitor mode of a network device. The option parameter can only be 'start' or 'stop'.
     */
    airmon(option: string, device: string): string | number;

    /**
     * Used to inject frames on wireless interfaces.
     *
     *
     *
     * Once the command with Control+C is stopped, it will save the captured information in a text file called file.cap in the path where the terminal is currently located.
     *
     * Alternatively, a maximum of captured acks can be specified for the command to stop automatically, saving the file.cap file as described above.
     *
     * In the event that there is an error, a string will be returned with the message indicating the problem.
     */
    aireplay(bssid: string, essid: string, maxAcks?: number): string | null;

    /**
     * Start the process of decrypting the password.
     */
    decipher(encryptedPass: string): string | null;

    /**
     * SMTP services are mail services. When using this method with the IP of a mail server, due to a vulnerability in the service, it returns a list of the existing users on the computer where the SMTP service is working. 
     * If these users also have an email account registered on the SMTP server, it will be indicated in the list.
     *
     * Returns a list object of all users on the machine, along with their email address or returns a string containing an error
     */
    smtp_user_list(ipAddress: string, port: number): string | string[] | null;
  }

  interface MetaLib {
    /**
     * Returns the name of the library.
     */
    lib_name(): string;

    /**
     * Returns the version of the library.
     */
    version(): string;

    /**
     * Exploits the indicated vulnerability through the buffer overflow method.
     * The object returned can be of various types or even not return anything, so it is advisable to use the typeof method with the object returned.
     * Depending on the result, it may be necessary to pass extra arguments so that the exploit runs correctly, for example in the case of a password change.
     */
    overflow(memAddress: string, unsecValue: string, optArgs?: string): string | number | Shell | Computer | File;

    /**
     * Returns the library in debug mode, as an object of type LibraryDebug. To obtain it, it is necessary to provide a valid username and password of a Neurobox engineer.
     */
    debug_tools(user: string, password: string): void;
  }

  interface Metaxploit {
    /**
     * Load the library in memory and return it as a metalib type if the process was successful.
     */
    load(path: string): MetaLib | null;

    /**
     * It connects to the specified address and establishes a null session to gain access to a library remotely.
     * This type of attack is only available for services that work remotely.
     * If no port is specified, it will connect directly to the router.
     * If the process has been executed correctly, an object of type net_session will be returned.
     */
    net_use(ipAddress: string, port?: number): NetSession | null;

    /**
     * Analyze the memory areas occupied by the library in search of vulnerabilities. Returns a list with the affected memory zones.
     */
    scan(metaLib: MetaLib): string[];

    /**
     * It analyzes a specific memory address and shows the vulnerable parts that can be exploited.
     */
    scan_address(metaLib: MetaLib, memAddress: string): string;

    /**
     * The terminal listens to the network packets of any connection that passes through this device. 
     * When any connection information is captured, it prints a string with the obtained data. 
     * It can save the source code of the encode script if saveEncSource is true.
     * Null is returned if the listen could not be started.
     */
    sniffer(saveEncSource: number): string;

    /**
     * Launches a process on the victim's machine, which silently tries to continuously connect in the background to the specified address and port.
     * For the reverse shell to run successfully, the rshell service must be installed and the portforward configured correctly on the machine where the server is waiting for the victim's connection.
     */
    rshell_client(address: string, port?: number, procName?: string): number | string;

    /**
     * This method returns a list of shell objects that have been reverse shell connected to this machine.
     * In order to manage the connections received, the rshell service must be installed on the machine that receives the victims' connections.
     */
    rshell_server(): Shell[];
  }

  interface Port {
    /**
     * Returns a string with the local IP address of the computer pointed to by this port.
     */
    get_lan_ip(): string;

    /**
     * Returns true if this port is closed, false otherwise.
     */
    is_closed(): number;

    /**
     * Returns an number with the configured port number.
     */
    port_number(): number;
  }

  interface Router {
    /**
     * Returns a string with the router's public ip address.
     */
    public_ip(): string;

    /**
     * Returns a string with the router's local ip address.
     */
    local_ip(): string;

    /**
     * Returns the port object that is behind the port number provided if exists, null otherwise.
     */
    ping_port(port: number): string;

    /**
     * Returns a string with the information of the port that has been provided. The port provided must not belong to another network than this router.
     */
    port_info(portObject: Port): string;

    /**
     * Returns an array of ports that are being used in this router.
     */
    used_ports(): Port[];

    /**
     * Takes a LAN IP address and returns a list with open ports accessible in the network.
     */
    device_ports(ipAddress: string): Port[];

    /**
     * Returns a list with any computer whose gateway is the current device with the ips of the routers and switches that it can reach with a ping. 
     * Some of the returned addresses could be behind a firewall
     */
    devices_lan_ip(): string[];

    /**
     * Returns a string with the ESSID value of the router.
     */
    essid_name(): string;

    /**
     * Returns a string with the BSSID value of the router.
     */
    bssid_name(): string;

    /**
     * Returns a string with the version of the kernel_router.so library
     */
    kernel_version(): string;

    /**
     * Returns a string list with the firewall rules present in the router or switch.
     */
    firewall_rules(): string;
  }

  interface NetSession {
    /**
     * Returns the metalib associated with the remote service.
     *
     *
     *
     * For example, connecting to a computer with the ssh service will return a metalib libssh object.
     *
     * In the case of connecting to a router, it returns a metalib kernel_router object.
     */
    dump_lib(): MetaLib;

    /**
     * Returns the number of devices connected to it as a gateway.
     */
    get_num_conn_gateway(): number;

    /**
     * Returns the number of ports configured with a portforward from the remote device.
     */
    get_num_portforward(): number;

    /**
     * Returns the number of user accounts on the target
     */
    get_num_users(): number;

    /**
     * Returns true if there are any active users on the system, false otherwise.
     */
    is_any_active_user(): number;

    /**
     * Returns true if the root user is active on the system, false otherwise.
     */
    is_root_active_user(): number;
  }

  interface File {
    /**
     * Returns rather the file is able to be imported.
     */
    allow_import(): number;

    /**
     * Modifies the file's permissions
     *
     *
     *
     * Takes a permissions string (e.g. u+wr) and optional recursive flag (int 0 or 1)
     *
     * If the file is a folder and the recursive flag is 1, the permissions change will apply recursively, to all the files and folders inside the folder.
     *
     * Returns a string (empty on success, or with an error on failure)
     */
    chmod(permission: string, isRecursive?: number): string;

    /**
     * Copy the file to the specified path.
     *
     * On success, returns 1 and the terminal outputs the copied file dialogue. On failure, returns either an error (string) such as permission denied or null (if File object not valid).
     */
    copy(path: string, newName: string): string | number | null;

    /**
     * Move the file to the specified path.
     *
     * On success, returns 1. On failure, returns either an error (string) such as permission denied or null (if File object not valid).
     */
    move(path: string, newName: string): string | number | null;

    /**
     * Rename the file with the name provided.
     *
     * Returns a string (empty on success, or with an error on failure)
     */
    rename(newName: string): string | number | null;

    /**
     * Returns a string with the absolute path of the file. If followSymlink is true, it will print the path of the symlink destination.
     */
    path(followSymlink?: number): string;

    /**
     * Returns the folder that contains this file or null if the initial object is /.
     */
    parent(): File[];

    /**
     * Returns a string with the name of the file.
     */
    name(): string;

    /**
     * Returns a string with the contents of the text file.
     */
    get_content(): string;

    /**
     * Save the text in the file. The content will be overwritten if there is already text saved in the file.
     *
     * Returns 1 on success, or a string (containing an error) on failure
     */
    set_content(content: string): string;

    /**
     * Returns true if the file is binary, false otherwise.
     */
    is_binary(): number;

    /**
     * Returns true if the file is folder, false otherwise.
     */
    is_folder(): number;

    /**
     * Returns true if the user who launches the script has the necessary permissions.
     * The type_perm parameter is used for reading ('r'), writing ('w') and execution ('x')
     */
    has_permission(permission: string): number;

    /**
     * Delete the file
     *
     * Returns a string (empty on success, or with an error on failure)
     */
    delete(): string | null;

    /**
     * Returns an array of the folders contained in this object. This function is only available if this object is a folder, so it is advisable to first use the is_folder function before calling this method.
     */
    get_folders(): File[];

    /**
     * Returns an array of files (excluded folders) contained in this object. This function is only available if this object is a folder, so it is advisable to first use the is_folder function before calling this method.
     */
    get_files(): File[];

    /**
     * Returns a string with the current file permissions.
     */
    permissions(): string;

    /**
     * Returns a string with the name of the file owner.
     */
    owner(): string;

    /**
     * Apply a owner to this file. By default, the owner does not apply recursively. To apply the owner recursively, the optional parameter must be 1.
     *
     * Returns a string (empty on success, or with an error on failure)
     */
    set_owner(ownerName: string, isRecursive?: number): number;

    /**
     * Returns a string with the name of the group to which this file belongs.
     */
    group(): string;

    /**
     * Apply a group to this file. By default, the group does not apply recursively. To apply the group recursively, the optional parameter must be 1.
     *
     * Returns a string (empty on success, or with an error on failure)
     */
    set_group(groupName: string, isRecursive?: number): number;

    /**
     * Returns a string with the size of the file in bytes.
     */
    size(): string;

    /**
     * Presumedly returns metadata information about a file.
     *
     * **This requires moderator permissions on Multiplayer, and is unavailable in Singleplayer.*
     */
    meta_info(): any;

    /**
     * Creates a symbolic link at the specified path.
     */
    symlink(path: string, file_new_name: string): void;

    /**
     * Returns true/false if the file object is a symbolic link.
     */
    is_symlink(): void;
  }

  interface TrafficNet {
    /**
     * Opens a traffic camera system window with controls to switch between cameras.
     */
    camera_link_system(): number | string;

    /**
     * Searches traffic cameras to see if a vehicle with the specified license plate can be identified. If true, the viewer will switch to the camera. If not, a string indicating an error is returned.
     */
    locate_vehicle(licensePlate: string): number | string;

    /**
     * Switches to the next camera.
     */
    next_camera(): number | string;

    /**
     * Switches to the previous camera.
     */
    prev_camera(): number | string;

    /**
     * [Work in progress] - Wild speculation, but maybe this will let you kill NPCs, or at least delay them from reaching work?
     */
    traffic_light_config(): string;
  }

  interface DebugLibrary {
    /**
     * Returns a list with a single partial object of type Computer if potential zero-day vulnerabilities are found in the specified memory zone. If a file path is provided, its associated partial object of type File will also be added to the list. Additionally, if this file is a library, its metalib object will also be added to the returned list.
     */
    payload(memoryZone: string, path: string): void;

    /**
     * Applies the patch with the corrected code to the text file specified in the path. Returns true if the patch has been applied successfully, false otherwise.
     */
    apply_patch(path: string): string;

    /**
     * Scans the library in debug mode to find possible code errors that could lead to a vulnerability. If any potential issues are found, the associated code snippet is printed.
     */
    scan(): string;

    /**
     * Automated tests are conducted on the specified lines of code. If potential vulnerabilities are found due to existing errors in these lines, the partial objects that would be obtained by exploiting it are printed, as well as the memory zone affected by the new vulnerability and its details.
     */
    unit_testing(errorLines: number[]): string;
  }

  interface SmartAppliance {
    /**
     * Returns the model of the appliance as a string.
     */
    model(): string;

    /**
     * Overrides the power and temp. values of the appliance. Returns true if successful, otherwise returning a string as an error.
     */
    override_settings(power: number, temperature: number): number | string;

    /**
     * Activates or deactivates the sound alarm that indicates if there is any malfunction in the appliance.
     */
    set_alarm(enable: number): number | string;
  }

  interface Computer {
    /**
     * Get the hostname of the computer.
     */
    get_name(): string;

    /**
     * Returns an array of active ports on the computer.
     */
    get_ports(): Port[];

    /**
     * Returns the file located in the given path, relative or absolute. The file returned can be a folder. If the file does not exist, it is returned null.
     */
    File(path: string): File | null;

    /**
     * Create a folder in the specified path.
     */
    create_folder(path: string, folderName: string): number;

    /**
     * Returns true if the computer has internet access, false otherwise.
     */
    is_network_active(): number;

    /**
     * Create an empty text file.
     *
     * Returns 1 on success, or a string (containing an error) on failure
     */
    touch(path: string, fileName: string): number | string;

    /**
     * Returns a string with the list of active processes on the machine.
     */
    show_procs(): string;

    /**
     * Returns a string with the list of network devices available on the computer.
     */
    network_devices(): string[];

    /**
     * Change the password of an existing user on the machine, for a new one.
     * It is necessary to be root to be able to execute the method.
     *
     * Returns 1 on success, or error string on failure
     */
    change_password(user: string, password: string): number;

    /**
     * Create a user on the machine, with the specified name and password. It is necessary to be root to be able to execute the method.
     *
     * Returns 1 on success, or error string on failure
     */
    create_user(user: string, password: string): number;

    /**
     * Delete the indicated user from the computer, also deleting its home folder optionally. 
     * By default, if the optional parameter is not passed, the home folder will not be deleted.
     * It is necessary to be root to be able to execute the method.
     *
     * Returns 1 on success, or error string on failure
     */
    delete_user(user: string, removeHome?: number): number;

    /**
     * Create a new group associated with an existing user on the machine. It is necessary to be root to be able to execute the method.
     *
     * Returns 1 on success, or error string on failure
     */
    create_group(user: string, groupName: string): number;

    /**
     * Delete the indicated user group. It is necessary to be root in order to execute this method.
     *
     * Returns 1 on success, or error string on failure
     */
    delete_group(user: string, groupName: string): number;

    /**
     * Returns a string with the list of groups created in the indicated user.
     */
    groups(user: string): string;

    /**
     * Close the program associated with the PID. To show the list of the running programs along with their PIDs use the ps command.
     *
     * Returns 1 on success, 0 if the process cannot be found, or an error string on failure to terminate the process
     */
    close_program(PID: number): number;

    /**
     * Returns a list of the Wi-Fi networks that are available.
     */
    wifi_networks(netDevice: string): string[];

    /**
     * Connect to the indicated Wifi network. Returns true if the connection was successful.
     *
     * Returns 1 on successful connection, null if the network cannot be found, or an error string on connection failure
     */
    connect_wifi(netDevice: string, bssid: string, essid: string, password: string): number;

    /**
     * Notice: Ethernet is currently disabled in multiplayer on both public and nightly builds!
     *
     * Set up a new IP address on the machine through the ethernet connection.
     * Returns a string with the error message if the connection failed. In case of success, an empty string is returned.
     */
    connect_ethernet(netDevice: string, localIp: string, gateway: string): number;

    /**
     * Returns a string with the gateway configured on the computer.
     */
    network_gateway(): string;

    /**
     * Returns a string with the keyword WIFI if the current device is connected to a router by WiFi, if it is connected by cable a string with the keyword ETHERNET is returned.
     */
    active_net_card(): string;

    /**
     * Returns a string with the computer's local ip address.
     */
    local_ip(): string;

    /**
     * Returns a string with the computer's public ip address.
     */
    public_ip(): string;
  }

  interface General {
    /**
     * Reset your player password used for all CTFs.
     */
    reset_ctf_password(new_password: string): string | number;

    /**
     * Access the email account
     *
     * Returns a MetaMail type object if the login has been correct. In case of error, it returns a string
     */
    mail_login(user: string, password: string): string | MetaMail;

    /**
     * Print on the Terminal the message.
     */
    print(value: string, replaceText?: number): number;

    /**
     * Pauses the script for the indicated time. If duration is not specified, the default value is 1 second.
     */
    wait(seconds: number): null;

    /**
     * Returns the number of seconds since the program execution began.
     */
    time(): number;

    /**
     * Returns a string with the type of the object passed as a parameter.
     */
    typeof(anyObject: any): string;

    md5(value: string): string;

    /**
     * Gets the event created in the web browser. In case of success, it will return a CTFEvent type object, otherwise it will return a string with the error.
     */
    get_ctf(user: string, password: string, eventName: string): CTFEvent | string;

    /**
     * Returns the router whose public IP matches, otherwise returns null.
     * If the ip_address parameter is not specified, returns the router to which the computer executing this command is connected.
     */
    get_router(ipAddress?: string): Router | null;

    /**
     * Returns the switch on the local network whose IP matches, otherwise it returns null.
     */
    get_switch(ipAddress: string): Router | null;

    /**
     * Returns the shell that is executing the script if it is called without parameters. 
     * Passing a username and password, it returns a shell with those credentials if are correct.
     */
    get_shell(username?: string, password?: string): Shell | null;

    /**
     * Returns the IP address that is behind the web address that has been provided.
     */
    nslookup(hostname: string): string;

    /**
     * Shows the administrator information behind the IP provided.
     */
    whois(ipAddress: string): string;

    /**
     * Returns true if the provided address is valid, false otherwise.
     */
    is_valid_ip(ipAddress: string): number;

    /**
     * Returns true if the provided address is local, false otherwise. If the provided IP is not valid, it also returns false.
     */
    is_lan_ip(ipAddress: string): number;

    /**
     * Returns the information of common commands of the Operating System, such as mkdir, whois, etc.
     */
    command_info(idCommand: string): string;

    /**
     * Returns the time and date.
     */
    current_date(): string;

    /**
     * It returns a string with the path in which the terminal is at the moment of launching the script.
     */
    current_path(): string;

    /**
     * Returns the parent directory of the given path.
     */
    parent_path(path: string): string;

    /**
     * Returns a string with home folder path of the user who is executing the script.
     */
    home_dir(): string;

    /**
     * Returns a string with the path of the program that is running at this time.
     */
    program_path(): string;

    /**
     * Returns a string with the name of the user who is executing the script.
     */
    active_user(): string;

    /**
     * Returns a string with the user's email address that is executing this script.
     * This is only defined on a player's home computer.
     */
    user_mail_address(): string;

    /**
     * Returns a string with the bank account number of the user who is executing this script.
     * This is only defined on a player's home computer.
     */
    user_bank_number(): number;

    /**
     * Format the text provided so that it is ordered by columns.
     */
    format_columns(columns: string): string;

    /**
     * It puts the program on hold to receive the user input, which will be processed as a string. If the password mode is activated, the input text will be hidden with asterisks. If the anyKey argument is true, the entered character will be captured without pressing enter.
     */
    user_input(message: string, isPassword?: number, anyKey?: number): string;

    /**
     * Includes an external library to be used in scripting. If the library has been included correctly, it will return an object of corresponding type with the library, null otherwise
     */
    include_lib(libPath: string): Crypto | Metaxploit | AptClient | Blockchain | Service;

    /**
     * Bitwise operators are used for manipulating data at the bit level.
     * Bitwise operates on one or more bit patterns or binary numerals at the level of their individual bits. 
     * They are used in numerical computations to make the calculation process faster.
     * The operator argument accepts the following operators:
     * &, |, ^, <<, >>, >>>
     */
    bitwise(operator: string, num1: number, num2: number): number;

    /**
     * Returns the bitwise AND operation of the provided inputs.
     */
    bitAnd(num1: number, num2: number): number;

    /**
     * Returns the bitwise OR operation of the provided inputs.
     */
    bitOr(num1: number, num2: number): number;

    /**
     * Returns the bitwise OR operation of the provided inputs.
     */
    bitXor(num1: number, num2: number): number;

    /**
     * Clears all text from the terminal.
     */
    clear_screen(): null;

    /**
     * Stops the execution of the script at the time this method is executed. Optionally you can pass a string as a message that will be printed in the terminal when the program ends.
     */
    exit(message?: string): null;

    /**
     * Includes external code into the current code. Can be used to split code in multiple files.
     * Note: The code will be added to the current code upon compiling.
     */
    import_code(absolutePath: string): null;

    /**
     * Returns a integer that is "relatively unique" to the given value. In the case of strings, the hash is case-sensitive. In the case of a list r map, the hash combines the hash values of all elements.
     */
    hash(obj: string): number;

    /**
     * Returns the path of the program that launched this program.
     */
    launch_path(): string;

    /**
     * Returns the logarithm of the provided input to the specified base.
     */
    log(num: number, base?: number): number;

    /**
     * Returns the absolute value of the provided input.
     */
    abs(num: number): number;

    /**
     * Returns the arccosine of the provided input in radians.
     */
    acos(num: number): number;

    /**
     * Returns the arcsine of the provided input in radians.
     */
    asin(num: number): number;

    /**
     * Returns the arctangent of the provided input in radians.
     */
    atan(num: number): number;

    /**
     * Returns the tangent of the provided input.
     */
    tan(num: number): number;

    /**
     * Returns the cosine of the provided input.
     */
    cos(num: number): number;

    /**
     * Returns the sine of the provided input.
     */
    sin(num: number): number;

    /**
     * Returns the unicode character at the provided input's code point.
     */
    char(num: number): string;

    /**
     * Returns the provided input floored to it's base integer.
     */
    floor(num: number): number;

    /**
     * Returns a list object containing values from the start to the end, incrementing by increment.
     */
    range(start: number, end?: number, increment?: number): number[];

    /**
     * Returns the provided input rounded to the decimal place provided.
     */
    round(num: number, decimals?: number): number;

    /**
     * Returns a random float between 0 and 1. If seed is provide, it seeds the random number with the given value.
     */
    rnd(seed?: number): number;

    /**
     * Returns the sign of the provided input.
     */
    sign(num: number): number;

    /**
     * Returns the square root of the provided input.
     */
    sqrt(num: number): number;

    /**
     * Converts the provided input into a string.
     */
    str(num: number): string;

    /**
     * Returns the provided input raised to the next or equal integer.
     */
    ceil(num: number): number;

    /**
     * Returns 3.14159265358979 (this will probably never be useful!)
     */
    pi(): number;

    /**
     * Returns the provided string or list from index start to index end.
     */
    slice(sequence: any, from: number, to?: number): string | any[];

    /**
     * Returns an empty Map object that can be used to share data back and forth with programs launched with shell.launch.
     */
    get_custom_object(): void;

    /**
     * Same as Computer.local_ip, but works exclusively with Computer and not Router
     */
    lan_ip(computer: Computer): string;

    /**
     * Same as Computer.public_ip, but works exclusively with Computer and not Router
     */
    public_ip_pc(computer: Computer): string;

    /**
     * Same as MetaMail.delete, but works exclusively with MetaMail and no other types
     */
    delete_mail(metamail: MetaMail, mail_id: string): number | string;

    /**
     * Same as SubWallet.delete, but works exclusively with SubWallet and no other types
     */
    delete_subwallet(subwallet: SubWallet): number | string;

    /**
     * Same as SubWallet.get_balance, but works exclusively with SubWallet and not Wallet
     */
    get_balance_subwallet(subwallet: SubWallet): number | string;
  }

  interface String {
    /**
     * Returns the string without the first occurrence of the provided substring.
     */
    remove(subString: string): string;

    /**
     * Returns 1 if the index exists. Returns 0 otherise.
     */
    hasIndex(index: number): number;

    /**
     * Returns the first index of the provided input with the string. Optionally searches after begin. Returns Null if not found.
     */
    indexOf(subString: string, startIndex?: number): number | null;

    /**
     * Returns the last index of the provided input with the string. Returns -1 if not found.
     */
    lastIndexOf(subString: string): number;

    /**
     * Returns a list object of substrings. 
     *  Uses regular expressions.
     */
    split(delimiter: string, regexOptions?: string): string[];

    /**
     * Returns the string with any instances of new replaced with old. 
     *  Uses regular expressions.
     */
    replace(old: string, new_: string, regexOptions?: string): string;

    /**
     * Inserts the provided value into the specified index on the string. Returns the updated string.
     */
    insert(index: number, value: any): string;

    /**
     * Returns the string stripped of any spacing at the beginning or end.
     */
    trim(): string;

    /**
     * Returns a list object containing indexes of all characters in the string.
     */
    indexes(): number[];

    /**
     * Returns the unicode code point of the first character in the string.
     */
    code(): number;

    /**
     * Returns the length of the provided object.
     */
    len(): number;

    /**
     * Returns the lowercase string.
     */
    lower(): string;

    /**
     * Returns the uppercase string.
     */
    upper(): string;

    /**
     * Converts the string to a float.
     */
    val(): number;

    /**
     * Returns a list object containing values of all characters in the string.
     */
    values(): string[];

    /**
     * Converts the string to a integer.
     */
    to_int(): number;

    /**
     * Returns a boolean dependent on if the string contains the pattern.
     */
    is_match(pattern: string, regexOptions?: string): number;

    /**
     * Returns a list of every match.
     */
    matches(pattern: string, regexOptions?: string): string[];
  }

  interface List {
    /**
     * Returns 1 if the index exists. Returns 0 otherise.
     */
    hasIndex(index: number): number;

    /**
     * Returns the index of the provided value. Optionally searches after begin. Returns Null if not found.
     */
    indexOf(value: any): number | null;

    /**
     * Returns the list without the first occurrence of the provided input.
     */
    remove(index: number): any[];

    /**
     * Concatenates all items within the list and returns them in a single string.
     */
    join(delimiter: string): string;

    /**
     * Pushes the provided input onto the end of the list. Returns the updated list, and updates the list in it's place.
     */
    push(value: any): List;

    /**
     * Inserts the provided value into the specified index on the list. Returns the updated list, and updates the list in it's place.
     */
    insert(index: number, value: any): List;

    /**
     * Returns the last element of the list, and removes that element from the list.
     */
    pop(): any;

    /**
     * Returns the first element of the list, and removes that element from the list.
     */
    pull(): any;

    /**
     * Randomly remaps values in a list, leaving the keys in their original order.
     */
    shuffle(): List;

    /**
     * Reverses the list, rearranging the element in reverse order.
     */
    reverse(): List;

    /**
     * Sorts a list alphanumerically.
     */
    sort(key?: string, ascending?: number): List;

    /**
     * Returns a list object containing the list's indexes
     */
    indexes(): number[];

    /**
     * Returns the length of the provided object.
     */
    len(): number;

    /**
     * Returns a list object containing the list's values
     */
    values(): any[];

    /**
     * Returns the total of all numeric values in a list.
     */
    sum(): number;
  }

  interface Map {
    /**
     * Returns 1 if the index exists. Returns 0 otherise.
     */
    hasIndex(key: any): number;

    /**
     * Returns the first index of the provided input with the string. Optionally searches after begin. Returns Null if not found.
     */
    indexOf(value: any): number | null;

    /**
     * Pushes the provided input onto the end of the map. Returns the updated map, and updates the map in it's place.
     */
    push(key: any): Map;

    /**
     * Returns the map without the first occurrence of the provided input.
     */
    remove(key: any): any[];

    /**
     * Returns a list object containing the map's indexes.
     */
    indexes(): any[];

    /**
     * Returns the length of the provided object.
     */
    len(): number;

    /**
     * Returns the key of the first element in the map, and removes that element from the map.
     */
    pop(): any;

    /**
     * Randomly remaps values in a map, leaving the keys in their original order.
     */
    shuffle(): Map;

    /**
     * Returns the total of all numeric values in a map.
     */
    sum(): number;

    /**
     * Returns a list object containing the map's values.
     */
    values(): List;
  }
}

export = GreyHack;
export as namespace GreyHack;
