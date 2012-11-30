require 'rkelly'

def detective(src)
    parser = RKelly::Parser.new
    ast = parser.parse(src)

    reqs = Array.new

    ast.each do |node|
        next if node.class != RKelly::Nodes::FunctionCallNode

        next if node.value.class != RKelly::Nodes::ResolveNode
        name_node = node.value

        next if name_node.value != 'require'
        args_node = node.arguments

        req_id = args_node.value[0].value
        next if req_id.class != String

        reqs.push req_id.gsub(/'/, '')
    end

    return reqs
end

