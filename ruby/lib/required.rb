require 'detective'

def required(filename)
    contents = File.read(filename)
    base = File.dirname(filename)

    deps = Array.new

    detective(contents).each do |req_id|
        path = File.expand_path(req_id, base)

        idx_path = File.join(path, 'index.js')
        path += '.js' if File.extname(path).empty?

        dep = Hash.new
        dep['id'] = req_id

        # try to load index path if regular doesn't exit
        path = idx_path if !File.exists? path

        dep['path'] = path
        dep['deps'] = required(path)

        deps.push dep
    end

    return deps
end
