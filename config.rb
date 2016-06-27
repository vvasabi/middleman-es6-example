set :js_dir, 'js'

# Enable ES6 parsing
require 'sprockets/es6'
activate :sprockets do |config|
  config.supported_output_extensions << '.es6'
end

# Configure Babel
::Sprockets::ES6.configure do |config|
  config.marshal_load({
    modules: 'amd',
    moduleIds: true
  })
end

# Allow Babel Polyfill to be included
sprockets.append_path File.join(Gem::Specification.find_by_name('babel-source').gem_dir, 'lib')

# Ignore concatenated files
ignore 'js/vendor/*'
ignore 'js/zoo/*'

# Allow ES6 scripts to be accessed without the .es6 extension
def remap_es6_files(dir)
  Dir.foreach(File.join(config[:source], dir)) do |file|
    next if file == '.' or file == '..'

    path = File.join(dir, file)
    if File.directory?(File.join(config[:source], path))
      remap_es6_files(path)
    elsif file =~ /\.es6$/
      proxy path.gsub(/\.es6$/, ''), path, ignore: true
    elsif file =~ /\.es6\.erb$/
      proxy path.gsub(/\.es6\.erb$/, ''), path.gsub(/\.erb$/, ''), ignore: true
    end
  end
end
remap_es6_files(config[:js_dir])

# Remove .es6 files
after_build do |builder|
  def remove_es6_files(builder, dir)
    Dir.foreach(dir) do |file|
      next if file == '.' or file == '..'

      path = File.join(dir, file)
      if File.directory?(path)
        remove_es6_files(builder, path)
      elsif file =~ /\.es6$/
        builder.thor.remove_file(path)
      end
    end
  end

  remove_es6_files(builder, config[:build_dir])
end
