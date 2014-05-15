VAGRANTFILE_API_VERSION = "2"
Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
    config.vm.box = "lucid64"
    config.vm.box_url = "http://files.vagrantup.com/lucid64.box"

    config.vm.network "forwarded_port", guest: 8083, host: 8084

    config.vm.synced_folder "app", "/app"

    config.vm.provision :chef_solo do |chef|
        chef.cookbooks_path = "cookbooks"
        chef.json = {
            "nodejs" => {
                "version" => "0.10.23"
            }
        }
        chef.add_recipe "apt"
        chef.add_recipe "build-essential"
        chef.add_recipe "nodejs"
        chef.add_recipe "mongodb::10gen_repo"
        chef.add_recipe "git"
    end
end
