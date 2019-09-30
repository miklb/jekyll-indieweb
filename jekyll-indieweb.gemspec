# frozen_string_literal: true

Gem::Specification.new do |s|
  s.name          = "jekyll-indieweb"
  s.version       = "2.0.0-alpha"
  s.authors       = ["Michael Bishop"]
  s.email         = ["miklb@miklb.com"]

  s.summary       = "IndieWeb compatible theme for Jekyll."
  s.homepage      = "https://github.com/miklb/jekyll-indieweb"
  s.license       = "MIT"

  s.files         = `git ls-files -z`.split("\x0").select { |f| f.match(%r!^(assets|_layouts|_includes|_sass|LICENSE|README)!i) }

  s.add_runtime_dependency 'jekyll', '> 3.5', '< 5.0'
  s.add_runtime_dependency "jekyll-paginate", "~> 1.1"
  s.add_runtime_dependency "jekyll-sitemap", "~> 1.3.1"
  s.add_runtime_dependency "jekyll-seo-tag", "~> 2.6.1"
  s.add_runtime_dependency "jekyll-gist", "~> 1.5"
  s.add_runtime_dependency "jekyll-feed", "~> 0.12.1"
  s.add_runtime_dependency "jekyll-data", "~> 1.0"
  s.add_runtime_dependency "jekyll-include-cache", "~> 0.2"

  s.add_development_dependency "bundler", "~> 2.0.1"
  s.add_development_dependency "rake", "~> 12.0"
end