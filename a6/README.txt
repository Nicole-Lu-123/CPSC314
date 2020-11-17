A6
Nicole Lu
99734410


Q1
sphere_intersect(ray myRay, sphere sphr).
sphere_intersect2(ray myRay, sphere sphr).
nearestT(ray myRay).
localShade(vec3 P, vec3 N, vec3 I, vec3 surfColor).
bgColor(ray myRay)
rayCast2(ray myRay) 
rayCast(ray myRay) 
initialize()
main()

1.nearestT(ray myRay) calls sphere_intersect(ray myRay, sphere sphr).
(at following: "->" means calls, the variables consuming are clipped)
2.localShade() ->nearestT().
3.rayCast2() -> nearestT(),localShade(),bgColor().
4.rayCast->nearestT(),localShade(),rayCast2(),bgColor(),(in creation:sphere_intersect()).
5.main()->initialize(),rayCast().

Something create:
1.I did the phong shader in localShader. I defined ka,kb,kc and use power of 5, I wrote the code and reference
is the website I post.
2.I made 2 more reflectedRay to make the red ball reflect scene.And I use the larger anser of sphere_intersect
to make the most front ball refracts the floor after it. The second fromt ball also can reflect the red light
from the back ball when it come close to that ball.
