# frozen_string_literal: true

Gem::Specification.new do |spec|
  spec.name          = "jekyll-indieweb"
  spec.version       = "2.0.0a"
  spec.authors       = ["Michael Bishop"]
  spec.email         = ["miklb@miklb.com"]

  spec.summary       = "IndieWeb compatible theme for Jekyll."
  spec.homepage      = "https://github.com/miklb/jekyll-indieweb"
  spec.license       = "MIT"

  spec.files         = `git ls-files -z`.split("\x0").select { |f| f.match(%r!^(assets|_layouts|_includes|_sass|LICENSE|README)!i) }

  spec.add_runtime_dependency "jekyll", "~> 3.8"

  spec.add_development_dependency "bundler", "~> 1.16"
  spec.add_development_dependency "rake", "~> 12.0"
end