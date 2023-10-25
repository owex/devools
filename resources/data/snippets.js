const snippets = [
  {
    slug: 'tar-file-folder',
    title: 'Tar a file/folder',
    description: 'Tar a file or folder on the command line',
    code: 'tar -zcvf filename.tar.gz foldername',
    codeType: 'bash',
  },
  {
    slug: 'run-composer-without-memory-limit',
    title: 'Run Composer without a memory limit',
    description: '',
    code: 'php -d memory_limit=-1 /usr/local/bin/composer install',
    codeType: 'bash',
    categories: ['php', 'cli'],
  },
  {
    slug: 'curl-file',
    title: 'cURL File',
    description: 'Download file to location in Terminial using cURL',
    code: 'curl -O www.devools.com/examplefile.zip',
    codeType: 'bash',
    categories: ['curl', 'cli'],
  },
  {
    slug: 'untar-file-folder',
    title: 'Untar a file/folder',
    description: 'Untar a tar.gz folder in the same directory',
    code: 'tar xvf filename.tar.gz',
    codeType: 'bash',
    categories: ['tar', 'cli'],
  },
  {
    slug: 'remove-directory-sub-directories-bash-commands',
    title: 'Remove a directory and all sub directories - Bash Commands',
    description: 'Force remove a directory and all sub directories',
    code: 'rm -f -r foldername',
    codeType: 'bash',
    categories: ['linux', 'cli'],
  },
  {
    slug: 'changing-file-folder-ownership-bash-linux-commands',
    title: 'Changing file/folder ownership - Bash / Linux Commands',
    description:
      'Changing file/folder ownership can be done via running the chown command on the command line.',
    code: 'chown user -R foldername',
    codeType: 'bash',
    categories: ['linux', 'cli'],
  },
  {
    slug: 'find-large-files-bash-linux-commands',
    title: 'Find large files using Unix/Bash/Linux commands',
    description:
      'The command you provided is a combination of several Unix/Linux commands that are used to find and list files in a directory.',
    htmlContent: `<ol>
    <li>
      <p><code>find</code> Command:</p>
      <ul>
        <li>The <code>find</code> command is used to search for files and directories in a specified directory.</li>
        <li><code>-type f</code>: This option tells <code>find</code> to search for regular files (not directories or other types of files).</li>
        <li><code>-size +sizek</code>: This part is used to specify a size filter. Replace <code>size</code> with a numeric value and <code>k</code> with a unit (e.g., <code>k</code> for kilobytes, <code>M</code> for megabytes). It finds files that are larger than the specified size.</li>
      </ul>
    </li>
    <li>
      <p><code>exec</code> Option:</p>
      <ul>
        <li>After finding files that match the specified criteria, the <code>-exec</code> option is used to execute a command on each found file.</li>
        <li><code>ls -lh {} \;</code>: Here, the <code>ls -lh</code> command is executed on each file to list their details in a human-readable format, including file size, permissions, owner, group, modification date, and filename.</li>
      </ul>
    </li>
    <li>
      <p><code>awk</code> Command:</p>
      <ul>
        <li>The <code>awk</code> command is used to format the output.</li>
        <li><code>'{ print $9 ": " $5 }'</code>: This part extracts the 9th and 5th columns from the <code>ls -lh</code> output, which are the filename and file size, respectively. It then prints these two pieces of information in the format "filename: size."</li>
      </ul>
    </li>
  </ol>`,
    code: 'find /directory -type f -size +sizek -exec ls -lh {} \\; | awk \'{ print $9 ": " $5 }\'',
    codeType: 'bash',
  },
  {
    slug: 'creating-repo-svn',
    title: 'Creating an SVN repo using svnadmin on a Linux server',
    description: 'Create and checkout a repo using svnadmin.',
    code: `cd /var/www/svn
svnadmin create reponame
chown -R apache reponame
cd /var/www/html/
svn co http://serverip/svn/reponame

// optional centos apache setup
cd /etc/httpd/vhosts/active/
cp othersite.conf reponame.conf
/etc/init.d/httpd configtest // ensure logs exist
/etc/init.d/httpd restart`,
    codeType: 'bash',
    categories: ['cli', 'svn'],
  },
  {
    slug: 'creating-ftp-account-vsftpd',
    title: 'Creating an FTP Account - vsftpd',
    description:
      'Create an FTP account in a Bash or Linux environment to enable FTP access.',
    code: `su -
adduser USERNAME
passwd USERNAME
usermod -d DirectoryPath USERNAME
vi /etc/vsftpd/chroot_list`,
    codeType: 'bash',
    categories: ['cli', 'ftp', 'vsftpd'],
  },
  {
    slug: 'canonical-auto-to-www-apache',
    title: 'Canonical - Auto to WWW - Apache',
    description:
      'Configure Apache to automatically redirect requests to the WWW subdomain.',
    code: `RewriteCond %{HTTP_HOST} !^www\.
RewriteRule ^(.*)$ http://www.%{HTTP_HOST}/$1 [R=301,L]`,
    codeType: 'apache',
    categories: ['apache', 'cli', 'linux'],
  },
  {
    slug: 'canonical-strips-trailing-slashes-apache',
    title: 'Canonical - Strips Trailing Slashes - Apache',
    description: 'Configure Apache to remove trailing slashes from URLs.',
    code: `RewriteCond %{REQUEST_FILENAME} !-d
# Externally redirect to remove trailing slash
RewriteRule ^(.+)/$ /$1 [R=301,L]`,
    codeType: 'apache',
    categories: ['apache', 'cli', 'linux'],
  },
  {
    slug: 'update-host-files-on-a-mac',
    title: 'Update host files on a Mac',
    description: 'Update the host file on a Mac for domain resolution control.',
    code: 'sudo nano /private/etc/hosts',
    codeType: 'bash',
    categories: ['cli', 'bash'],
  },
  {
    slug: 'flush-local-dns-on-mac',
    title: 'How to flush local DNS cache on Mac',
    description:
      'Flush the local DNS cache on a Mac to clear cached DNS records.',
    code: '',
    htmlContent: `
    <h2>Flushing DNS Cache on Mac OS X Yosemite:</h2>
    <p>Use the following Terminal command to reset the DNS cache:</p>
    <pre><code>sudo discoveryutil mdnsflushcache</code></pre>

    <h2>Flushing DNS Cache on Mac OS X Mavericks, Mountain Lion, and Lion:</h2>
    <p>You can use the same command to flush the DNS cache on Mac OS X Mavericks, Mountain Lion, and Lion:</p>
    <pre><code>sudo discoveryutil mdnsflushcache</code></pre>

    <p>Simply open the Terminal and run the appropriate command based on your Mac OS version to clear the DNS cache.</p>
    `,
    codeType: 'bash',
    categories: ['cli', 'bash'],
  },
  {
    slug: 'copy-a-trunk-to-branch',
    title: 'Copy a trunk to branch',
    description:
      'Copy code from a trunk branch to a feature branch in a version control system.',
    code: 'svn copy trunk/ file:///var/www/svn/nameofsite/branchname -m "your branchname"',
    codeType: 'bash',
    categories: ['svn', 'cli', 'git'],
  },
  {
    slug: 'match-last-word-after-delimiter',
    title: 'Match last word after delimiter',
    description:
      'Extract and match the last word in a string after a specified delimiter.',
    code: '.*DELIMITER(.*)',
    codeType: 'regex',
    categories: ['regex'],
  },
  {
    slug: 'clear-google-pagespeedmod-cache',
    title: 'Clear Google PageSpeedMod Cache',
    description:
      'Clear the cache created by Google PageSpeedMod for a website.',
    code: 'touch /var/cache/mod_pagespeed/cache.flush',
    codeType: 'linux',
    categories: ['linux', 'cli', 'google', 'pagespeed'],
  },
  {
    slug: 'ftp-setup-commands',
    title: 'FTP Setup Commands',
    description:
      'Set up and configure an FTP server with the necessary commands.',
    code: `service iptables stop
vi /etc/sysconfig/iptables
-A INPUT -m state --state NEW -m tcp -p tcp --dport 21 -j ACCEPT
service iptables start
vi /etc/vsftpd/vsftpd.conf
anonymous_enable=NO
ascii_upload_enable=YES
ascii_download_enable=YES
service vsftpd restart
useradd username
passwd chosenpassword
usermod -d / username`,
    codeType: 'bash',
    categories: ['ftp', 'cli', 'linux', 'vsftpd'],
  },
  {
    slug: 'chmod-recursive-directories-only',
    title: 'chmod Recursive Directories Only',
    description:
      'Change file permissions recursively for directories only in a Unix-like environment.',
    code: 'find /DIRECTORY -type d -exec chmod 755 {} ;',
    codeType: 'bash',
    htmlContent: `
    <p>Adjust -type d to -type f to target files exclusively</p>
    `,
    categories: ['unix', 'cli'],
  },
  {
    slug: 'chmod-recursively-files-only',
    title: 'chmod Recursively Files Only',
    description:
      'Change file permissions recursively for files only in a Unix-like environment.',
    code: 'find /DIRECTORY -type f -exec chmod 644 {} ;',
    codeType: 'bash',
    categories: ['unix', 'cli'],
  },
  {
    slug: 'using-border-box',
    title: 'Using Border-box',
    description:
      'Implement the CSS box-sizing property with the value "border-box" for better box model behavior.',
    code: `*, *:before, *:after {
-moz-box-sizing: border-box;
-webkit-box-sizing: border-box;
box-sizing: border-box;
}`,
    codeType: 'CSS',
    categories: ['css'],
  },
  {
    slug: 'youtube-video-xml-using-oembed',
    title: 'YouTube Video XML using oEmbed',
    description: 'Retrieve XML data for a YouTube video using oEmbed format.',
    code: `<?php
$video_url = '';
$info = simplexml_load_file("http://www.youtube.com/oembed?url=" . $video_url . "&format=xml");
$title = $info->title;
?>`,
    codeType: 'php',
    categories: ['php', 'youtube'],
  },
  {
    slug: 'vimeo-video-xml-using-oembed',
    title: 'Vimeo Video XML using oEmbed',
    description: 'Retrieve XML data for a Vimeo video using oEmbed format.',
    code: '<?php $info = simplexml_load_file("http://www.youtube.com/oembed?url=URL&format=xml"); ?>',
    codeType: 'php',
    categories: ['php', 'vimeo'],
  },
  {
    slug: 'foreach-loop-with-bash',
    title: 'Foreach loop with Bash',
    description:
      'Use a Bash script to implement a foreach loop for iterating through items.',
    code: `#!/bin/bash

  cd /var/www/vhosts

  for i in $( ls ); do
      echo $i
  done`,
    codeType: 'bash',
    categories: ['bash'],
  },
  {
    slug: 'create-a-db-user',
    title: 'Create a DB user',
    description: 'Create a user account in a database management system.',
    code: `CREATE USER 'username'@'%' IDENTIFIED BY 'password';`,
    codeType: 'sql',
    categories: ['mysql'],
  },
  {
    slug: 'user-creation-and-deletion-and-add-them-to-sudoers-and-a-custom-linux-user-group',
    title:
      'User Creation and Deletion and add them to sudoers and a custom Linux user group',
    description:
      'Create and delete user accounts, and add them to the sudoers file and a custom Linux user group.',
    code: `Adding users
To add a user to a linux server, set the password, add them to the psaserv group, and also add them to the list of sudoers use the following commands below.
$ useradd johndoe
$ passwd johndoe(input password twice)
$ vi /etc/group (add new user onto end of psaserv line
$ vi /etc/sudoers (add following below similar entries:)
johndoe ALL=(ALL) ALL

Removal
To remove a user called johndoe you can see if one exists by using cat, then delete the user, and use cat again to see if the user is removed.
$ cat /etc/passwd | grep -i johndoe
johndoe:x:10285:10285::/home/johndoe:/bin/bash
$ userdel johndoe
$ cat /etc/passwd | grep -i johndoe`,
    codeType: 'bash',
    categories: ['linux', 'cli'],
    htmlContent: `<p>The 'psaserv' group is for plesk so the user can have access to the plesk files</p>`,
  },
  {
    slug: 'rename-file-extensions',
    title: 'Rename File Extensions',
    description:
      'Change the file extensions of multiple files in a batch operation.',
    code: "for file in *.htm ; do mv $file `echo $file | sed 's/\\(.*\\).htm/\\1html/'` ; done",
    codeType: 'bash',
    categories: ['linux', 'cli'],
  },
  {
    slug: 'using-jquery-to-target-blank',
    title: 'Using jQuery to target=blank',
    description:
      'Use jQuery to open links in a new tab or window when clicked.',
    code: `$('a[data-rel*=external]').click( function() {
window.open(this.href);
return false;
});`,
    codeType: 'jQuery',
    categories: ['jquery'],
  },
  {
    slug: 'jquery-test-if-element-exists',
    title: 'jQuery Test if Element Exists',
    description:
      'Check if a specific HTML element exists on a web page using a custom jQuery plugin.',
    code: `$('selector').doesExist();
  /* return true|false if an element exists */
  jQuery.fn.doesExist=function(){return jQuery(this).length>0;};`,
    codeType: 'jQuery',
    categories: ['jquery'],
  },
  {
    slug: 'enable-gzip-compression',
    title: 'Enable GZIP Compression',
    description:
      'Enable GZIP compression for web server responses to reduce bandwidth usage.',
    code: `## ENABLE GZIP COMPRESSION ##
AddOutputFilterByType DEFLATE text/plain
AddOutputFilterByType DEFLATE text/html
AddOutputFilterByType DEFLATE text/xml
AddOutputFilterByType DEFLATE text/css
AddOutputFilterByType DEFLATE application/xml
AddOutputFilterByType DEFLATE application/xhtml+xml
AddOutputFilterByType DEFLATE application/rss+xml
AddOutputFilterByType DEFLATE application/javascript
AddOutputFilterByType DEFLATE application/x-javascript
## ENABLE GZIP COMPRESSION ##`,
    codeType: 'apache',
    categories: ['apache', 'compression'],
  },
  {
    slug: 'leverage-browser-caching',
    title: 'Leverage Browser Caching',
    description:
      'Configure web server settings to leverage browser caching for improved website performance.',
    code: `## LEVERAGE BROWSER CACHING ##
<IfModule mod_expires.c>
ExpiresActive On
ExpiresByType image/jpg "access 1 week"
ExpiresByType image/jpeg "access 1 week"
ExpiresByType image/gif "access 1 week"
ExpiresByType image/png "access 1 week"
ExpiresDefault "access 7 days"
</IfModule>

## Fonts caching for a year
<FilesMatch "\.(eot|svg|ttf|woff)$">
Header set Cache-Control "max-age=29030400, public"
</FilesMatch>

## Cache Icon, PDF and Flash movie for a year
<FilesMatch "\.(ico|pdf|flv|swf)$">
Header set Cache-Control "max-age=29030400, public"
</FilesMatch>

## Cache CSS and JS for 1 week
<FilesMatch "\.(xml|txt|css|js)$">
Header set Cache-Control "max-age=604800, proxy-revalidate"
</FilesMatch>

## LEVERAGE BROWSER CACHING ##`,
    codeType: 'apache',
    categories: ['apache', 'compression'],
  },
  {
    slug: 'font-smoothing',
    title: 'Font Smoothing',
    description:
      'Implement font smoothing techniques in CSS for better typography.',
    code: `-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale; /* Firefox 25*/`,
    codeType: 'css',
    categories: ['css'],
  },
  {
    slug: 'ssh-keep-alive',
    title: 'SSH Keep Alive',
    description:
      'Configure SSH to send keep-alive packets to maintain a stable connection.',
    code: `cd ~/.ssh/
nano config

ServerAliveInterval 30
ServerAliveCountMax 36`,
    codeType: 'ssh',
    categories: ['ssh'],
  },
  {
    slug: 'clockwise-and-anticlockwise-spin-in-css-keyframes',
    title: 'Clockwise and Anticlockwise Spin in CSS Keyframes',
    description:
      'Create CSS keyframes for elements to spin both clockwise and anticlockwise.',
    code: `@keyframes clockwiseSpin {
  from  {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes antiClockwiseSpin {
  from  {
    transform: rotate(360deg);
  }
  to {
    transform: rotate(0deg);
  }
}


.clockwiseSpin {
  animation-duration: 10s;
  animation-iteration-count: infinite;
  animation-name: clockwiseSpin;
  animation-timing-function: linear;
}

.antiClockwiseSpin {
  animation-duration: 10s;
  animation-iteration-count: infinite;
  animation-name: antiClockwiseSpin;
  animation-timing-function: linear;
}`,
    codeType: 'CSS',
    categories: ['css'],
  },
  {
    slug: 'find-website-ip-in-terminal',
    title: 'Find Website IP in Terminal',
    description:
      'Use terminal commands to find the IP address of a website or domain.',
    code: 'nslookup www.google.com',
    codeType: 'bash',
  },
  {
    slug: 'custom-fonts-not-rendering',
    title: 'Custom Fonts Not Rendering Properly on Apache Server',
    description:
      'Resolve issues related to custom fonts not rendering properly on a website.',
    code: `<FilesMatch "\.(ttf|otf|eot|woff)$">
  <IfModule mod_headers.c>
    Header set Access-Control-Allow-Origin "*"
  </IfModule>
</FilesMatch>`,
    codeType: 'apache',
    categories: ['apache'],
  },
  {
    slug: 'xampp-mysql-start-from-command',
    title: 'XAMPP MySQL Start from Command',
    description: 'Start the MySQL server in XAMPP from the command line.',
    code: 'sudo /Applications/XAMPP/xamppfiles/bin/mysql.server start',
    codeType: 'bash',
    categories: ['cli', 'mysql'],
  },
  {
    slug: 'restore-google-chrome-light-skin-on-macos',
    title: 'Restore Google Chrome Light Skin on MacOS',
    description:
      'Switch back to the light skin theme in Google Chrome on MacOS.',
    code: 'defaults write com.google.Chrome NSRequiresAquaSystemAppearance -bool yes',
    codeType: 'bash',
    categories: ['chrome', 'macos'],
  },
  {
    slug: 'dump-mysql-database-to-file-using-mysqldump',
    title: 'Dump MySQL Database to File using mysqldump',
    description:
      'Create a backup of a MySQL database to a file using mysqldump utility.',
    code: 'mysqldump -u USERNAME -p DBNAME > DBNAME.export.sql',
    codeType: 'bash',
    categories: ['cli', 'mysql'],
  },
  {
    slug: 'copy-ssh-public-key-to-clipboard',
    title: 'Copy SSH Public Key to Clipboard',
    description:
      'Copy the SSH public key to the system clipboard for easy pasting.',
    code: 'pbcopy < ~/.ssh/id_rsa.pub',
    codeType: 'bash',
    categories: ['cli', 'ssh'],
  },
  {
    slug: 'prune-all-local-branches-not-on-remote',
    title: 'Prune all Local Branches not on Remote',
    description:
      'Remove local Git branches that do not have corresponding remote branches.',
    code: "git branch -r | awk '{print $1}' | egrep -v -f /dev/fd/0 <(git branch -vv | grep origin) | awk '{print $1}' | xargs git branch -d",
    codeType: 'bash',
    categories: ['git'],
  },
  {
    slug: 'run-composer-without-a-memory-limit',
    title: 'Run Composer without a Memory Limit',
    description:
      'Run Composer without a memory limit restriction in a Git environment.',
    code: 'php -d memory_limit=-1 /usr/local/bin/composer install',
    codeType: 'Git',
  },
];

const docker = [
  {
    slug: 'get-env-docker-command',
    title: 'Get Environment Variables in Docker - Docker Commands',
    description: 'View environment variables in a Docker container',
    code: 'docker exec CONTAINER_ID /bin/sh -c /usr/bin/env',
    codeType: 'bash',
    categories: ['docker', 'cli'],
  },

  {
    slug: 'view-logs-docker-container-command',
    title: 'View Logs of a Docker Container - Docker Commands',
    description: 'Display the logs of a Docker container',
    code: 'docker logs CONTAINER_NAME_OR_ID',
    codeType: 'bash',
    categories: ['docker', 'cli'],
  },

  {
    slug: 'open-ssh-docker-command',
    title: 'Open SSH in a Docker Container - Docker Commands',
    description: 'Access a shell inside a Docker container via SSH',
    code: 'docker exec -it CONTAINER_ID sh',
    codeType: 'bash',
    categories: ['docker', 'cli'],
  },

  {
    slug: 'list-docker-services-command',
    title: 'List Docker Services - Docker Commands',
    description: 'List all services running in Docker',
    code: 'docker service ls',
    codeType: 'bash',
    categories: ['docker', 'cli'],
  },

  {
    slug: 'prune-all-docker-command',
    title: 'Prune All Docker Resources - Docker Commands',
    description: 'Remove all unused Docker resources from the system',
    code: 'docker system prune --all',
    codeType: 'bash',
    categories: ['docker', 'cli'],
  },
  {
    slug: 'delete-containers-images-volumes-docker-compose',
    title:
      'Delete Containers, Images, and Volume Data - Docker-Compose Command',
    description: 'Stop the app, delete containers, images, and volume data.',
    code: 'docker-compose down --rmi all -v',
    codeType: 'bash',
    categories: ['docker', 'cli'],
  },
];

const sqlSnippets = [
  {
    slug: 'migrate-db-sql-commands',
    title: 'Migrate Database - SQL Commands',
    description: 'Instructions to migrate a database using SQL commands.',
    codeType: 'bash',
    categories: ['database', 'sql'],
    steps: [
      {
        title: 'Download',
        code: 'mysqldump -u admin -p DBNAME > mysqlfile.sql',
        description: 'Download the database dump.',
      },
      {
        title: 'Transfer File from SSH to Current Location',
        code: 'scp root@IP_ADDRESS:/root/DBNAME.sql .',
        description:
          'Transfer the database dump from SSH to the current location.',
      },
      {
        title: 'Import',
        code: 'mysql -u root -p DATABASENAME < data-dump.sql',
        description: 'Import the database dump into a new database.',
      },
    ],
  },

  {
    slug: 'setup-htaccess-sql-commands',
    title: 'Setup .htaccess - SQL Commands',
    description: 'Instructions to set up .htaccess using SQL commands.',
    codeType: 'bash',
    categories: ['web', 'htaccess', 'sql'],
    steps: [
      {
        title: 'Setup .htaccess',
      },
    ],
  },

  {
    slug: 'transfer-uploads-sql-commands',
    title: 'Transfer Uploads - SQL Commands',
    description: 'Instructions to transfer uploads using SQL commands.',
    codeType: 'sql',
    categories: ['sql'],
    steps: [
      {
        title: 'Tar Uploads',
        code: 'tar -zcvf filename.tar.gz foldername',
        description: 'Create a tar archive of the uploads folder.',
      },
      {
        title: 'Transfer Uploads',
        code: 'scp root@IP_ADDRESS:/var/www/html/PLACEHOLDER.tar.gz .',
        description: 'Transfer the tar archive to the current location.',
      },
      {
        title: 'Untar',
        code: 'tar xvf uploads.tar.gz',
        description: 'Extract the contents of the tar archive.',
      },
    ],
  },

  {
    slug: 'create-db-sql-commands',
    title: 'Create Database and User - SQL Commands',
    description:
      'Instructions to create a database and user using SQL commands.',
    codeType: 'bash',
    categories: ['database', 'sql'],
    steps: [
      {
        title: 'Create Database',
        code: 'CREATE DATABASE DATABASENAME;\nUSE DATABASENAME;',
        description: 'Create a database and set it as the active database.',
      },
      {
        title: 'Create User',
        code:
          "CREATE USER XXXXX IDENTIFIED BY 'XXXXXXXXXXX';\n" +
          "CREATE USER PLACEHOLDER IDENTIFIED BY 'PLACEHOLDER';\n" +
          "CREATE USER 'PLACEHOLDER'@'localhost' IDENTIFIED BY 'PLACEHOLDER';",
        description: 'Create user accounts with passwords.',
      },
      {
        title: 'Grant Privileges',
        code:
          "GRANT ALL PRIVILEGES ON *.* TO 'PLACEHOLDER'@'localhost';\n" +
          "GRANT ALL privileges ON `XXXXX`.* TO XXXX@localhost IDENTIFIED BY 'XXXXXXXXXXX';\n" +
          "GRANT ALL PRIVILEGES ON *.* TO 'PLACEHOLDER'@'%' WITH GRANT OPTION;\n" +
          "GRANT ALL privileges ON PLACEHOLDER.* TO PLACEHOLDER@localhost IDENTIFIED BY 'PLACEHOLDER';",
        description: 'Grant privileges to the created users.',
      },
      {
        title: 'Chown and Permissions',
        code:
          'chown apache:apache -R * # Let Apache be owner\n' +
          'find . -type d -exec chmod 755 {} \\; # Change directory permissions rwxr-xr-x\n' +
          'find . -type f -exec chmod 644 {} \\; # Change file permissions rw-r--r--',
        description: 'Set ownership and permissions for files and directories.',
      },
      {
        title: 'Show All Users',
        code: 'SELECT User, Host, Password FROM mysql.user;',
        description: 'View a list of all MySQL users.',
      },
    ],
  },
];

const gitCommands = [
  {
    slug: 'reset-to-master-locally-git-commands',
    title: 'Reset to Master Branch Locally - Git Command',
    description: 'Instructions to reset to the master branch locally in Git.',
    code: 'git branch | grep -v "master" | xargs git branch -D',
    codeType: 'bash',
    categories: ['git', 'version control'],
  },
  {
    slug: 'revert-specific-commits-git-commands',
    title: 'Revert Specific Commits - Git Command',
    description: 'Instructions to revert specific commits in Git.',
    code: 'git revert SHA1 SHA2 SHA3', // Placeholder for commit SHA values
    codeType: 'bash',
    categories: ['git', 'version control'],
  },
  {
    slug: 'revert-last-two-commits-git-commands',
    title: 'Revert Last Two Commits - Git Command',
    description: 'Instructions to revert the last two commits in Git.',
    code: 'git revert HEAD~2..HEAD',
    codeType: 'bash',
    categories: ['git', 'version control'],
  },
  {
    slug: 'revert-range-of-commits-git-commands',
    title: 'Revert a Range of Commits - Git Command',
    description:
      'Instructions to revert a range of commits in Git using commit hashes.',
    code: 'git revert SHA1..SHA2', // Placeholder for commit SHA values
    codeType: 'bash',
    categories: ['git', 'version control'],
  },
  {
    slug: 'revert-merge-commit-git-command',
    title: 'Revert a Merge Commit - Git Command',
    description:
      'Instructions to revert a merge commit in Git using a specific merge commit SHA.',
    code: 'git revert -m 1 <merge_commit_sha>', // Placeholder for merge commit SHA value
    codeType: 'bash',
    categories: ['git', 'version control'],
  },
  {
    slug: 'manually-reset-to-specific-commit-git-commands',
    title: 'Manually Reset to a Specific Commit - Git Commands',
    description:
      'Instructions to manually reset your index and work tree to a specific commit without changing HEAD in Git. Be sure to write a descriptive commit message.',
    code: [
      'git checkout SHA .', // Placeholder for commit SHA value
      'git commit',
    ],
    codeType: 'bash',
    categories: ['git', 'version control'],
  },
];

const composerCommands = [
  {
    slug: 'install-dependencies-composer-command',
    title: 'Install Dependencies - Composer Command',
    description: 'Use Composer to install project dependencies.',
    code: 'composer install',
    codeType: 'bash',
    categories: ['composer', 'dependency management'],
  },
  {
    slug: 'update-dependencies-composer-command',
    title: 'Update Dependencies - Composer Command',
    description: 'Use Composer to update project dependencies.',
    code: 'composer update',
    codeType: 'bash',
    categories: ['composer', 'dependency management'],
  },
  {
    slug: 'require-package-composer-command',
    title: 'Require Package - Composer Command',
    description:
      'Use Composer to require a new package and add it to the composer.json file.',
    code: 'composer require vendor/package',
    codeType: 'bash',
    categories: ['composer', 'dependency management'],
  },
  {
    slug: 'remove-package-composer-command',
    title: 'Remove Package - Composer Command',
    description:
      'Use Composer to remove a package and update the composer.json file.',
    code: 'composer remove vendor/package',
    codeType: 'bash',
    categories: ['composer', 'dependency management'],
  },
  {
    slug: 'show-package-versions-composer-command',
    title: 'Show Package Versions - Composer Command',
    description: 'Use Composer to list available versions of a package.',
    code: 'composer show vendor/package --all | grep versions',
    codeType: 'bash',
    categories: ['composer', 'dependency management'],
  },
  {
    slug: 'self-update-composer-command',
    title: 'Self-Update Composer - Composer Command',
    description:
      'Use Composer to update Composer itself to the latest version.',
    code: 'composer self-update',
    codeType: 'bash',
    categories: ['composer', 'dependency management'],
  },
];

const mergedSnippets = [
  ...snippets,
  ...docker,
  ...sqlSnippets,
  ...gitCommands,
  ...composerCommands,
];

module.exports = mergedSnippets;
