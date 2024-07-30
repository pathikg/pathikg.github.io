1. Tokenization
	1. https://huggingface.co/learn/nlp-course/en/chapter6/5 
	2. https://github.com/openai/tiktoken
		1. how da duck they're using same tokenizer for all models or no?
	3. Why 9.11 > 9.9 (Blog)
2. Embeddings
	1. word2vec: https://arxiv.org/pdf/1301.3781 
	2. RoPE embeddings: https://arxiv.org/abs/2104.09864 
	3. Sentence Transformer embeddings: https://towardsdatascience.com/sentencetransformer-a-model-for-computing-sentence-embedding-e8d31d9e6a8f 
	4. Cross Encoders
	6. Jina embeddings: https://arxiv.org/pdf/2307.11224
	7. How to fine-tune embeddings on particular corpus? (Blog)
	8. ColPali Embeddings: https://blog.vespa.ai/retrieval-with-vision-language-models-colpali/ 
3. Attention
	1. Self Attention / Cross attention: https://arxiv.org/pdf/1706.03762
	2. Cross Attention in Vision transformers: https://arxiv.org/abs/2106.05786 
	3. Flash Attention:
		1. https://github.com/Dao-AILab/flash-attention 
		2. https://arxiv.org/abs/2205.14135
	4. Group Query Attention:
		1. https://arxiv.org/pdf/2305.13245 
	5. Ring Attention:
		1. https://arxiv.org/abs/2310.01889
	6. Paged Attention: https://huggingface.co/docs/text-generation-inference/en/conceptual/paged_attention 
4. LLMs
	1. LLAMA-3 405B: https://ai.meta.com/research/publications/the-llama-3-herd-of-models/
	3. Mistral 7B: https://arxiv.org/abs/2310.06825 
	4. Gemma:  https://arxiv.org/pdf/2403.08295
	5. Mixture of Experts
	6. Mamba:
		1. https://github.com/state-spaces/mamba
	7. 
5. vLLMs
	1. PaliGemma: https://arxiv.org/pdf/2407.07726 
	2. Florence 2: https://arxiv.org/pdf/2311.06242.pdf 
	3. Qwen: https://arxiv.org/pdf/2308.12966
	4. How to extend any LLM with Vision Encoder? (Blog)
	5. 
6. Training Techniques
	1. Pre-taining
	2. Fine-tuning
		1. DPO (blog material)
		2. PPO (blog material)
		3. SFT
		4. FFT
		5. PEFT
			1. LORA
			2. QLORA
			3. DORA
		6. How to handle Catastrophic forgetting while finetuning?
	3. Distillation
7. Quantization
	1. https://huggingface.co/docs/optimum/en/concept_guides/quantization 
	2. Inference Optimization
		1. vLLM
		2. llama.cpp
		3. gguf format?
		4. unsloth (blog)
8. 