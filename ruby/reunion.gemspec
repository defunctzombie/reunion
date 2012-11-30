Gem::Specification.new do |spec|
    spec.name = 'reunion'
    spec.summary = 'Bring your javascript files together. In a peaceful way.'
    spec.author = 'Roman Shtylman'
    spec.email = 'shtylman@gmail.com'
    spec.version = '0.0.0'
    spec.homepage = 'https://github.com/shtylman/reunion'
    spec.files = Dir['lib/*.rb'] + Dir['bin/*'] + Dir['client/*']
    spec.require_paths << 'lib'
    spec.executable = 'reunion'
    spec.add_dependency 'rkelly', '1.0.7'
end
